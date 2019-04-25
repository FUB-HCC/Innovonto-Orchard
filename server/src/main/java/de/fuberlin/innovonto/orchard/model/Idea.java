package de.fuberlin.innovonto.orchard.model;

import javax.persistence.*;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Entity
public class Idea {
    static final int MAX_TITLE_LENGTH = 2_000;
    static final int MAX_CONTENT_LENGTH = 10_000;

    private static final String currentContest = "debug-contest";
    private static final String unknownCreator = "unknown";


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(name = "content", length = MAX_CONTENT_LENGTH, nullable = false)
    private String content;

    @Column(name = "title", length = MAX_TITLE_LENGTH, nullable = false)
    private String title;

    private Boolean isCurrentVersion = true;

    @Temporal(TemporalType.TIMESTAMP)
    private Date created;

    private String creator;
    private String ideaContest;
    private String submissionMethod;
    private String status;

    @ElementCollection
    private List<String> applicationAreas;

    @ElementCollection
    private List<String> ideaUsers;

    private String ideaDetails;
    private String ideaProblem;
    private String ideaUsersOther;

    @ElementCollection
    private List<String> inspiredBy;

    @Column(name = "icon_path", nullable = true)
    private String iconPath;

    public Idea() {
        this.status = "icv-needed";
        this.ideaContest = currentContest;
        this.creator = unknownCreator;
    }

    public Idea(String content, Date created, String creator, String ideaContest, String submissionMethod) {
        this.content = content;
        this.created = created;
        this.creator = creator;
        this.ideaContest = ideaContest;
        this.submissionMethod = submissionMethod;
        this.isCurrentVersion = true;
        this.status = "unreviewed";
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Boolean getCurrentVersion() {
        return isCurrentVersion;
    }

    public void setCurrentVersion(Boolean currentVersion) {
        isCurrentVersion = currentVersion;
    }

    public Date getCreated() {
        return created;
    }

    public void setCreated(Date created) {
        this.created = created;
    }

    public String getCreator() {
        return creator;
    }

    public void setCreator(String creator) {
        this.creator = creator;
    }

    public String getIdeaContest() {
        return ideaContest;
    }

    public void setIdeaContest(String ideaContest) {
        this.ideaContest = ideaContest;
    }

    public String getSubmissionMethod() {
        return submissionMethod;
    }

    public void setSubmissionMethod(String submissionMethod) {
        this.submissionMethod = submissionMethod;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getIconPath() {
        return iconPath;
    }

    public void setIconPath(String iconPath) {
        this.iconPath = iconPath;
    }

    public List<String> getApplicationAreas() {
        return applicationAreas;
    }

    public void setApplicationAreas(List<String> applicationAreas) {
        this.applicationAreas = applicationAreas;
    }

    public List<String> getIdeaUsers() {
        return ideaUsers;
    }

    public void setIdeaUsers(List<String> ideaUsers) {
        this.ideaUsers = ideaUsers;
    }

    public String getIdeaDetails() {
        return ideaDetails;
    }

    public void setIdeaDetails(String ideaDetails) {
        this.ideaDetails = ideaDetails;
    }

    public String getIdeaProblem() {
        return ideaProblem;
    }

    public void setIdeaProblem(String ideaProblem) {
        this.ideaProblem = ideaProblem;
    }

    public String getIdeaUsersOther() {
        return ideaUsersOther;
    }

    public void setIdeaUsersOther(String ideaUsersOther) {
        this.ideaUsersOther = ideaUsersOther;
    }

    public List<String> getInspiredBy() {
        return inspiredBy;
    }

    public void setInspiredBy(List<String> inspiredBy) {
        this.inspiredBy = inspiredBy;
    }
}
