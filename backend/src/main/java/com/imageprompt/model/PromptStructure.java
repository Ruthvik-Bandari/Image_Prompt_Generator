package com.imageprompt.model;

public class PromptStructure {
    private String action;
    private String subject;
    private String style;
    private String scene;
    private String elements;

    public String getAction() { return action; }
    public void setAction(String action) { this.action = action; }

    public String getSubject() { return subject; }
    public void setSubject(String subject) { this.subject = subject; }

    public String getStyle() { return style; }
    public void setStyle(String style) { this.style = style; }

    public String getScene() { return scene; }
    public void setScene(String scene) { this.scene = scene; }

    public String getElements() { return elements; }
    public void setElements(String elements) { this.elements = elements; }
}