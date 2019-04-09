package de.fuberlin.innovonto.orchard.model;

import org.springframework.web.multipart.MultipartFile;

public class IdeaIconRequest {
    private MultipartFile file;

    public MultipartFile getFile() {
        return file;
    }

    public void setFile(MultipartFile file) {
        this.file = file;
    }
}
