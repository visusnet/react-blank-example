import React, {Component} from 'react';
import './App.css';
import Form from 'react-blank';

class App extends Component {
    state = {
        isValid: false,
        shouldFocusButton: false
    };

    onValidate = (fieldName, fieldValue, allFields) => {
        const isValid = Boolean(allFields['text1']) &&
            Boolean(allFields['text2']) &&
            Boolean(allFields['text3']) &&
            Boolean(allFields['text4']);
        this.setState({
            isValid,
            shouldFocusButton: isValid
        });
    };

    onLeaveField = (fieldName, focusManager, allFields) => {
        if (!this.state.shouldFocusButton) {
            if (fieldName === 'text1') {
                focusManager.focus('text3');
            } else if (fieldName === 'text2') {
                focusManager.focus('text4');
            } else if (fieldName === 'text3') {
                focusManager.focus('text2');
            } else if (fieldName === 'text4') {
                focusManager.focus('text1');
            }
        } else if (fieldName === 'text3') {
            this.setState({
                shouldFocusButton: false
            }, () => {
                focusManager.focus('button');
            });
        }
    };

    render() {
        return (
            <Form
                onValidate={this.onValidate}
                onLeaveField={this.onLeaveField}
                initialActiveElement='text2'>
                <p><input type="text" id="text1" placeholder="third"/>
                    <input type="text" id="text2" placeholder="first"/>
                    <input type="text" id="text3" placeholder="fourth"/>
                    <input type="text" id="text4" placeholder="second"/>
                    <button id="button" disabled={!this.state.isValid}>{this.state.isValid ? 'GO!' : 'NO!'}</button>
                    <input type="text" id="onlyreachableifvalid" placeholder="only reachable if valid"/>
                </p>
                <p>
                    Valid:
                    <select disabled="disabled" value={this.state.isValid}>
                        <option value="true">yes</option>
                        <option value="false">no</option>
                    </select>
                </p>
            </Form>
        );
    }
}

export default App;
