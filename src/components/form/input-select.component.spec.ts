import {
    beforeEach,
    beforeEachProviders,
    describe,
    expect,
    it,
    inject,
} from '@angular/core/testing';
import {ComponentFixture, TestComponentBuilder} from '@angular/compiler/testing';
import {Component} from '@angular/core';
import {By} from '@angular/platform-browser';
import {InputSelectComponent, InputSelectConfig} from './input-select.component';

describe('Component: InputSelect', () => {
    describe('Single Select', () => {
        let builder:TestComponentBuilder;

        beforeEachProviders(() => [InputSelectComponent]);
        beforeEach(inject([TestComponentBuilder], function (tcb:TestComponentBuilder) {
            builder = tcb;
        }));

        it('should create the component', inject([], () => {
            return builder.createAsync(SingleInputSelectComponentTestController)
                .then((fixture:ComponentFixture<any>) => {
                    let testController = fixture.componentInstance;
                    let query = fixture.debugElement.query(By.directive(InputSelectComponent));
                    expect(query).toBeTruthy();
                    expect(query.componentInstance).toBeTruthy();

                    fixture.detectChanges();
                    expect(query.componentInstance.value).toBe(testController.options[0]);
                });
        }));

        it('should update value of component when parent changes', inject([], () => {
            return builder.createAsync(SingleInputSelectComponentTestController)
                .then((fixture:ComponentFixture<any>) => {
                    let testController = fixture.componentInstance;
                    let compController = fixture.debugElement.query(By.directive(InputSelectComponent)).componentInstance;

                    fixture.detectChanges();
                    expect(compController.value).toBe(testController.options[0]);

                    testController.value1 = testController.options[1];
                    fixture.detectChanges();
                    expect(compController.value).toBe(testController.options[1]);

                    compController.value = testController.options[1];
                    fixture.detectChanges();
                    expect(compController.value).toBe(testController.options[1]);
                });
        }));

        it('should update value of parent when component changes', inject([], () => {
            return builder.createAsync(SingleInputSelectComponentTestController)
                .then((fixture:ComponentFixture<any>) => {
                    let testController = fixture.componentInstance;
                    let compController = fixture.debugElement.query(By.directive(InputSelectComponent)).componentInstance;

                    fixture.detectChanges();
                    expect(compController.value).toBe(testController.options[0]);

                    compController.value = testController.options[1];
                    fixture.detectChanges();
                    expect(testController.value1).toBe(testController.options[1]);
                });
        }));

        it('popupToggle', inject([], () => {
            return builder.createAsync(SingleInputSelectComponentTestController)
                .then((fixture:ComponentFixture<any>) => {
                    let compController = fixture.debugElement.query(By.directive(InputSelectComponent)).componentInstance;

                    fixture.detectChanges();
                    expect(compController._popupOpen).toBeFalsy();
                    expect(compController._classes.opened).toBeFalsy();
                    expect(compController._classes.closed).toBeTruthy();

                    compController.popupToggle();
                    fixture.detectChanges();
                    expect(compController._popupOpen).toBeTruthy();
                    expect(compController._classes.opened).toBeTruthy();
                    expect(compController._classes.closed).toBeFalsy();

                    compController.popupToggle();
                    fixture.detectChanges();
                    expect(compController._popupOpen).toBeFalsy();
                    expect(compController._classes.opened).toBeFalsy();
                    expect(compController._classes.closed).toBeTruthy();
                });
        }));

        it('window click should close', inject([], () => {
            return builder.createAsync(SingleInputSelectComponentTestController)
                .then((fixture:ComponentFixture<any>) => {
                    let compController = fixture.debugElement.query(By.directive(InputSelectComponent)).componentInstance;

                    fixture.detectChanges();
                    expect(compController._popupOpen).toBeFalsy();

                    compController.popupToggle();
                    fixture.detectChanges();
                    expect(compController._popupOpen).toBeTruthy();

                    compController.checkDocumentEvent({
                        path: [
                            compController._element.nativeElement
                        ]
                    });
                    fixture.detectChanges();
                    expect(compController._popupOpen).toBeTruthy();

                    compController.checkDocumentEvent({
                        path: []
                    });
                    fixture.detectChanges();
                    expect(compController._popupOpen).toBeFalsy();
                });
        }));

        it('open up when near bottom of screen', inject([], () => {
            return builder.createAsync(SingleInputSelectComponentTestController)
                .then((fixture:ComponentFixture<any>) => {
                    let compController = fixture.debugElement.query(By.directive(InputSelectComponent)).componentInstance;

                    compController.window.innerHeight = 200;
                    compController.popupOpen();
                    fixture.detectChanges();
                    expect(compController._classes.opened).toBeTruthy();
                    expect(compController._classes.closed).toBeFalsy();
                    expect(compController._classes.openUp).toBeTruthy();
                    expect(compController._classes.openDown).toBeFalsy();

                    compController.window.innerHeight = 2000;
                    compController.popupOpen();
                    fixture.detectChanges();
                    expect(compController._classes.opened).toBeTruthy();
                    expect(compController._classes.closed).toBeFalsy();
                    expect(compController._classes.openUp).toBeFalsy();
                    expect(compController._classes.openDown).toBeTruthy();
                });
        }));

        it('get a proper title', inject([], () => {
            return builder.createAsync(SingleInputSelectComponentTestController)
                .then((fixture:ComponentFixture<any>) => {
                    let testController = fixture.componentInstance;
                    let compController = fixture.debugElement.query(By.directive(InputSelectComponent)).componentInstance;

                    fixture.detectChanges();
                    expect(compController.getTitle()).toBe(testController.options[0]);

                    compController.value = null;
                    fixture.detectChanges();
                    expect(compController.getTitle()).toBe('Select');
                });
        }));

        it('item clicked', inject([], () => {
            return builder.createAsync(SingleInputSelectComponentTestController)
                .then((fixture:ComponentFixture<any>) => {
                    let testController = fixture.componentInstance;
                    let compController = fixture.debugElement.query(By.directive(InputSelectComponent)).componentInstance;

                    fixture.detectChanges();
                    expect(compController.value).toBe(testController.options[0]);

                    compController.itemClicked(testController.options[1]);
                    fixture.detectChanges();
                    expect(compController.value).toBe(testController.options[1]);
                });
        }));

    });

    describe('Multi Select', () => {
        let builder:TestComponentBuilder;

        beforeEachProviders(() => [InputSelectComponent]);
        beforeEach(inject([TestComponentBuilder], function (tcb:TestComponentBuilder) {
            builder = tcb;
        }));

        it('should create the component', inject([], () => {
            return builder.createAsync(MultiInputSelectComponentTestController)
                .then((fixture:ComponentFixture<any>) => {
                    let query = fixture.debugElement.query(By.directive(InputSelectComponent));
                    expect(query).toBeTruthy();
                    expect(query.componentInstance).toBeTruthy();

                    fixture.detectChanges();
                    expect(query.componentInstance.value).toBeFalsy();
                });
        }));

        it('get a proper title', inject([], () => {
            return builder.createAsync(MultiInputSelectComponentTestController)
                .then((fixture:ComponentFixture<any>) => {
                    let testController = fixture.componentInstance;
                    let compController = fixture.debugElement.query(By.directive(InputSelectComponent)).componentInstance;

                    fixture.detectChanges();
                    expect(compController.getTitle()).toBe('Select');

                    compController.value = [testController.options[0]];
                    fixture.detectChanges();
                    expect(compController.getTitle()).toBe('one');

                    compController.value = [testController.options[0], testController.options[1]];
                    fixture.detectChanges();
                    expect(compController.getTitle()).toContain('2');

                    compController.value = testController.options;
                    fixture.detectChanges();
                    expect(compController.getTitle()).toContain('All');
                });
        }));

        it('item clicked', inject([], () => {
            return builder.createAsync(MultiInputSelectComponentTestController)
                .then((fixture:ComponentFixture<any>) => {
                    let testController = fixture.componentInstance;
                    let compController = fixture.debugElement.query(By.directive(InputSelectComponent)).componentInstance;

                    fixture.detectChanges();
                    expect(compController.value).toBeFalsy();

                    compController.itemClicked(testController.options[1]);
                    fixture.detectChanges();
                    expect(compController.value).toContain(testController.options[1]);

                    compController.itemClicked(testController.options[2]);
                    fixture.detectChanges();
                    expect(compController.value).toContain(testController.options[1]);
                    expect(compController.value).toContain(testController.options[2]);

                    compController.itemClicked(testController.options[1]);
                    fixture.detectChanges();
                    expect(compController.value).toContain(testController.options[2]);
                });
        }));
    });
});

@Component({
    selector: 'test',
    template: `
        <sh-input-select [(ngModel)]="value1" [options]="options"></sh-input-select>
    `,
    directives: [InputSelectComponent]
})
class SingleInputSelectComponentTestController {
    options = [
        'one',
        'two',
        'three',
    ];
    value1 = this.options[0];
}

@Component({
    selector: 'test',
    template: `
        <sh-input-select [(ngModel)]="value1" [options]="options" [config]="config"></sh-input-select>
    `,
    directives: [InputSelectComponent]
})
class MultiInputSelectComponentTestController {
    options = [
        'one',
        'two',
        'three',
    ];
    value1;
    config = new InputSelectConfig('multi');
}
