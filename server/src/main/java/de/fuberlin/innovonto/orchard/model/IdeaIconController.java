package de.fuberlin.innovonto.orchard.model;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.HandlerMapping;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@RestController
@RequestMapping("/api/icons")
public class IdeaIconController {
    private static final Logger log = LoggerFactory.getLogger(IdeaIconController.class);

    private final IdeaIconService iconService;

    @Autowired
    public IdeaIconController(IdeaIconService iconService) {
        this.iconService = iconService;
    }


    @PostMapping("/")
    public ResponseEntity<IdeaIconResponse> saveInspirationImage(@RequestParam(name = "file") MultipartFile file) throws IllegalAccessException, IOException {

        try {
            final String filename = iconService.storeFile(file);
            final String resourceName = "/api/icons/resource/" + filename;
            final IdeaIconResponse ideaIconResponse = new IdeaIconResponse(file.getOriginalFilename(), resourceName);
            return new ResponseEntity<>(ideaIconResponse, HttpStatus.OK);
        } catch (Exception e) {
            log.error("Error decoding Image!", e);
            throw new RuntimeException(e);
        }
    }


    @GetMapping("/resource/**")
    public ResponseEntity<Resource> downloadFile(HttpServletRequest request) {
        String requestedUri = (String)
                request.getAttribute(HandlerMapping.PATH_WITHIN_HANDLER_MAPPING_ATTRIBUTE);
        String filePath = requestedUri.substring("/api/icons/resource/".length());
        log.info("file request: " + filePath);
        // Load file as Resource
        Resource resource = iconService.loadFileAsResource(filePath);

        // Try to determine file's content type
        String contentType = null;
        try {
            contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
        } catch (IOException ex) {
            log.info("Could not determine file type.");
        }

        // Fallback to the default content type if type could not be determined
        if (contentType == null) {
            contentType = "application/octet-stream";
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                //.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }

}
