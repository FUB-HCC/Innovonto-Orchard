package de.fuberlin.innovonto.orchard.model;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.util.UUID;

public class IdeaIconService {
    private static final Logger log = LoggerFactory.getLogger(IdeaIconService.class);
    private final Path mediaDirectory;

    @Autowired
    public IdeaIconService(@Value("${innovonto.orchard.media.mediaDirectory}") String mediaDirectory) throws IOException {
        this.mediaDirectory = Paths.get(mediaDirectory);
        if (Files.exists(this.mediaDirectory)) {
            log.info("Using existing media directory: " + this.mediaDirectory);
        } else {
            log.info("Media directory '" + this.mediaDirectory + "' doesn't exist. Creating it.");
            Files.createDirectories(this.mediaDirectory);
        }
    }

    public String saveImageAndReturnIconPath(UUID inspirationId, byte[] imageByte) throws IOException {

        final Path inspirationsBasePath = this.mediaDirectory.resolve("inspirations");
        Files.createDirectories(inspirationsBasePath);
        final Path iconPath = inspirationsBasePath.resolve(inspirationId + ".png");
        Files.write(iconPath, imageByte, StandardOpenOption.WRITE, StandardOpenOption.CREATE);
        return "/media/" + this.mediaDirectory.relativize(iconPath);
    }


}
