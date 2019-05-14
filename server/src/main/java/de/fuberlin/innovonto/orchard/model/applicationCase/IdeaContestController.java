package de.fuberlin.innovonto.orchard.model.applicationCase;


import de.fuberlin.innovonto.orchard.model.Idea;
import de.fuberlin.innovonto.orchard.model.IdeaRepository;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v2/ideaContests")
public class IdeaContestController {
    private final IdeaRepository ideaRepository;
    private final IdeaContest bionicRadar;
    private final ResourceLoader resourceLoader;

    @Autowired
    public IdeaContestController(IdeaRepository ideaRepository, ResourceLoader resourceLoader) {
        this.ideaRepository = ideaRepository;
        this.bionicRadar = new IdeaContest(UUID.fromString("7bcbec93-5bf5-49e3-b7b3-31caa23003f6"), "bionic-radar");
        this.resourceLoader = resourceLoader;
    }

    @GetMapping("/")
    @ResponseBody
    public List<IdeaContest> getAllApplicationCases() {
        List<IdeaContest> allContests = new ArrayList<>();
        allContests.add(bionicRadar);
        return allContests;
    }

    @GetMapping(value = "/{ideaContestId}/sparks", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String getSparksForApplicationCase(@PathVariable UUID ideaContestId) throws IOException {
        final InputStream inputStream = resourceLoader.getResource("classpath:data/ac2-combined-ideas.json").getInputStream();
        return IOUtils.toString(inputStream, "UTF-8");
    }

    @GetMapping("/{ideaContestId}/ideas")
    public Iterable<Idea> getIdeasForApplicationCase(@PathVariable UUID ideaContestId) {
        return ideaRepository.findAllByIdeaContest(ideaContestId.toString());
    }


}
