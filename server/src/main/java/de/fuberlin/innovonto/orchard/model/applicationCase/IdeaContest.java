package de.fuberlin.innovonto.orchard.model.applicationCase;

import java.util.UUID;

public class IdeaContest {
    public UUID id;
    public String title;

    public IdeaContest() {
    }

    public IdeaContest(UUID id, String title) {
        this.id = id;
        this.title = title;
    }
}
