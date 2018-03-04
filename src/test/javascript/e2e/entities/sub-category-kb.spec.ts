import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('SubCategory e2e test', () => {

    let navBarPage: NavBarPage;
    let subCategoryDialogPage: SubCategoryDialogPage;
    let subCategoryComponentsPage: SubCategoryComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load SubCategories', () => {
        navBarPage.goToEntity('sub-category-kb');
        subCategoryComponentsPage = new SubCategoryComponentsPage();
        expect(subCategoryComponentsPage.getTitle())
            .toMatch(/naturalApp.subCategory.home.title/);

    });

    it('should load create SubCategory dialog', () => {
        subCategoryComponentsPage.clickOnCreateButton();
        subCategoryDialogPage = new SubCategoryDialogPage();
        expect(subCategoryDialogPage.getModalTitle())
            .toMatch(/naturalApp.subCategory.home.createOrEditLabel/);
        subCategoryDialogPage.close();
    });

    it('should create and save SubCategories', () => {
        subCategoryComponentsPage.clickOnCreateButton();
        subCategoryDialogPage.setNameInput('name');
        expect(subCategoryDialogPage.getNameInput()).toMatch('name');
        subCategoryDialogPage.getIsNaturalInput().isSelected().then((selected) => {
            if (selected) {
                subCategoryDialogPage.getIsNaturalInput().click();
                expect(subCategoryDialogPage.getIsNaturalInput().isSelected()).toBeFalsy();
            } else {
                subCategoryDialogPage.getIsNaturalInput().click();
                expect(subCategoryDialogPage.getIsNaturalInput().isSelected()).toBeTruthy();
            }
        });
        subCategoryDialogPage.categorySelectLastOption();
        subCategoryDialogPage.save();
        expect(subCategoryDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class SubCategoryComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-sub-category-kb div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class SubCategoryDialogPage {
    modalTitle = element(by.css('h4#mySubCategoryLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    isNaturalInput = element(by.css('input#field_isNatural'));
    categorySelect = element(by.css('select#field_category'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    };

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
    };

    getIsNaturalInput = function() {
        return this.isNaturalInput;
    };
    categorySelectLastOption = function() {
        this.categorySelect.all(by.tagName('option')).last().click();
    };

    categorySelectOption = function(option) {
        this.categorySelect.sendKeys(option);
    };

    getCategorySelect = function() {
        return this.categorySelect;
    };

    getCategorySelectedOption = function() {
        return this.categorySelect.element(by.css('option:checked')).getText();
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
