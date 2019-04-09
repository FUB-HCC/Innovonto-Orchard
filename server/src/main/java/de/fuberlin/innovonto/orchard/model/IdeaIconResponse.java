package de.fuberlin.innovonto.orchard.model;

public class IdeaIconResponse {

    private final String originalFileName;
    private final String resourceName;

    public IdeaIconResponse(String originalFileName, String resourceName) {
        this.originalFileName = originalFileName;
        this.resourceName = resourceName;
    }

    public String getResourceName() {
        return resourceName;
    }

    public String getOriginalFileName() {
        return originalFileName;
    }
}
