package com.kb.natural.cucumber.stepdefs;

import com.kb.natural.NaturalApp;

import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.ResultActions;

import org.springframework.boot.test.context.SpringBootTest;

@WebAppConfiguration
@SpringBootTest
@ContextConfiguration(classes = NaturalApp.class)
public abstract class StepDefs {

    protected ResultActions actions;

}
