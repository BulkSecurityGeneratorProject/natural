import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Brand e2e test', () => {

    let navBarPage: NavBarPage;
    let brandDialogPage: BrandDialogPage;
    let brandComponentsPage: BrandComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Brands', () => {
        navBarPage.goToEntity('brand-kb');
        brandComponentsPage = new BrandComponentsPage();
        expect(brandComponentsPage.getTitle())
            .toMatch(/naturalApp.brand.home.title/);

    });

    it('should load create Brand dialog', () => {
        brandComponentsPage.clickOnCreateButton();
        brandDialogPage = new BrandDialogPage();
        expect(brandDialogPage.getModalTitle())
            .toMatch(/naturalApp.brand.home.createOrEditLabel/);
        brandDialogPage.close();
    });

    it('should create and save Brands', () => {
        brandComponentsPage.clickOnCreateButton();
        brandDialogPage.setBrandNameInput('brandName');
        expect(brandDialogPage.getBrandNameInput()).toMatch('brandName');
        brandDialogPage.save();
        expect(brandDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class BrandComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-brand-kb div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class BrandDialogPage {
    modalTitle = element(by.css('h4#myBrandLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    brandNameInput = element(by.css('input#field_brandName'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setBrandNameInput = function(brandName) {
        this.brandNameInput.sendKeys(brandName);
    };

    getBrandNameInput = function() {
        return this.brandNameInput.getAttribute('value');
    };

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
