package de.fuberlin.innovonto.orchard.model;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.*;

@Service
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

    public String storeFile(MultipartFile file) {
        // Normalize file name
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        try {
            // Check if the file's name contains invalid characters
            if (fileName.contains("..")) {
                throw new RuntimeException("Sorry! Filename contains invalid path sequence " + fileName);
            }

            // Copy file to the target location (Replacing existing file with the same name)
            Files.createDirectories(this.mediaDirectory.resolve("tmp"));

            Path targetLocation = this.mediaDirectory.resolve("tmp").resolve(fileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            return this.mediaDirectory.relativize(targetLocation).toString();
        } catch (IOException ex) {
            throw new RuntimeException("Could not store file " + fileName + ". Please try again!", ex);
        }
    }

    public Resource loadFileAsResource(String fileName) {
        try {
            Path tmpPath = Paths.get(fileName);
            Path filePath = this.mediaDirectory.resolve(tmpPath).normalize();
            Resource resource = new UrlResource(filePath.toUri());
            if (resource.exists()) {
                return resource;
            } else {
                throw new RuntimeException("File not found " + fileName);
            }
        } catch (MalformedURLException ex) {
            throw new RuntimeException("File not found " + fileName, ex);
        }
    }

    //TODO update icon location, once idea is saved.
}
