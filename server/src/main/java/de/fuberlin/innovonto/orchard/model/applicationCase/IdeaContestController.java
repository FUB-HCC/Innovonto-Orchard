package de.fuberlin.innovonto.orchard.model.applicationCase;


import de.fuberlin.innovonto.orchard.model.Idea;
import de.fuberlin.innovonto.orchard.model.IdeaRepository;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ResourceLoader;
import org.springframework.data.rest.webmvc.support.RepositoryEntityLinks;
import org.springframework.hateoas.Link;
import org.springframework.hateoas.Resource;
import org.springframework.hateoas.Resources;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;

@RestController
@RequestMapping("/api/v2/ideaContests")
public class IdeaContestController {

    private final RepositoryEntityLinks entityLinks;
    private final IdeaRepository ideaRepository;
    private final IdeaContest bionicRadar;
    private final ResourceLoader resourceLoader;

    @Autowired
    public IdeaContestController(RepositoryEntityLinks entityLinks, IdeaRepository ideaRepository, ResourceLoader resourceLoader) {
        this.entityLinks = entityLinks;
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
    public Resources<Resource<Idea>> getIdeasForApplicationCase(@PathVariable UUID ideaContestId) throws NoSuchMethodException {
        final Iterable<Idea> allByIdeaContest = ideaRepository.findAllByIdeaContest(ideaContestId.toString());
        final List<Resource<Idea>> allResources = new ArrayList<>();
        for(Idea idea : allByIdeaContest) {
            final Link selfLink = entityLinks.linkToSingleResource(Idea.class,idea.getId()).withSelfRel();
            final Resource<Idea> singleIdeaResource = new Resource<>(idea,selfLink);
            allResources.add(singleIdeaResource);
        }
        final Link link = linkTo(IdeaContestController.class,ideaContestId).withSelfRel();
        final Resources<Resource<Idea>> result = new Resources<>(allResources, link);
        return result;

    }

}
