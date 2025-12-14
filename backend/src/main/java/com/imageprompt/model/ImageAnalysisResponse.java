package com.imageprompt.model;

import java.util.Map;

public class ImageAnalysisResponse {
    private String description;
    private Map<String, Object> jsonPrompt;
    private String toonPrompt;
    private PromptStructure detailedPrompt;
    private String cinematicPrompt;
    private String error;

    public ImageAnalysisResponse() {}

    public ImageAnalysisResponse(String description, Map<String, Object> jsonPrompt, 
                                 String toonPrompt, PromptStructure detailedPrompt, 
                                 String cinematicPrompt, String error) {
        this.description = description;
        this.jsonPrompt = jsonPrompt;
        this.toonPrompt = toonPrompt;
        this.detailedPrompt = detailedPrompt;
        this.cinematicPrompt = cinematicPrompt;
        this.error = error;
    }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Map<String, Object> getJsonPrompt() { return jsonPrompt; }
    public void setJsonPrompt(Map<String, Object> jsonPrompt) { this.jsonPrompt = jsonPrompt; }

    public String getToonPrompt() { return toonPrompt; }
    public void setToonPrompt(String toonPrompt) { this.toonPrompt = toonPrompt; }

    public PromptStructure getDetailedPrompt() { return detailedPrompt; }
    public void setDetailedPrompt(PromptStructure detailedPrompt) { this.detailedPrompt = detailedPrompt; }

    public String getCinematicPrompt() { return cinematicPrompt; }
    public void setCinematicPrompt(String cinematicPrompt) { this.cinematicPrompt = cinematicPrompt; }

    public String getError() { return error; }
    public void setError(String error) { this.error = error; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private String error;
        
        public Builder error(String error) {
            this.error = error;
            return this;
        }
        
        public ImageAnalysisResponse build() {
            ImageAnalysisResponse response = new ImageAnalysisResponse();
            response.setError(error);
            return response;
        }
    }
}