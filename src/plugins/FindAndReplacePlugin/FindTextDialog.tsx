import * as React from 'react';
import { Dispatch, useState, useEffect } from 'react';

export function FindTextDialog({
    onChange,
    onChangeReplaceText,
    previousReplaceText,
    setPreviousReplaceText,
    previousSearchText,
    setPreviousSearchText,
    onClickReplace,
    onClickReplaceOnce
}: {
    onChange: Dispatch<string>;
    onChangeReplaceText: Dispatch<string>;
    previousReplaceText: string;
    setPreviousReplaceText: Dispatch<string>;
    previousSearchText: string;
    setPreviousSearchText: Dispatch<string>;
    onClickReplace: Dispatch<number>;
    onClickReplaceOnce:Dispatch<number>;
}): JSX.Element {

    const [inputText, setInputText] = useState(previousSearchText);
    const [replaceText, setReplaceText] = useState(previousReplaceText);
    useEffect(() => {
        onChange(previousSearchText);
    }, [])

    const handleChange = (e) => {
        const value = e.target.value;
        switch (e.target.id) {
            case "input-find":
                setInputText(value)
                setPreviousSearchText(value)
                setTimeout(() => {
                    onChange(value)
                }, 0);
                break;
            case "input-replace":
                setReplaceText(value);
                onChangeReplaceText(value);
                setPreviousReplaceText(value);
                break;

        }
    }

    return (
        <>
            <div className="find-box">
                <div className="">
                    <div className="d-flex">
                        <input
                            style={{ outline: 'none' }}
                            type="text"
                            id="input-find"
                            className="rounded rounded-bottom-0 rounded-end-0 d-flex flex-grow-2 flex-shrink-1 col-11 p-1 border border-1 border-secondary col-12 p-1"
                            placeholder="Find"
                            value={inputText}
                            onChange={
                                handleChange
                            }
                            data-test-id="image-modal-alt-text-input"
                        />
                        <div className="d-flex border-bottom border-end border-top border-1 border-secondary rounded-end rounded-bottom-0">
                            <button title="Find Next" type="button" className="rounded-0 toolbar-item" >
                                <span className="icon find-next  m-0"></span>
                            </button>
                            <button title="Find Previous" type="button" className="rounded-0  toolbar-item">
                                <span className="icon find-previous m-0"></span>
                            </button>
                        </div>
                    </div>

                    <div className="d-flex ">

                        <input
                            style={{ outline: 'none' }}
                            type="text"
                            id="input-replace"
                            className="rounded rounded-top-0 rounded-end-0 d-flex flex-grow-2 flex-shrink-1 col-11 p-1 border border-1 border-secondary"
                            placeholder="Replace"
                            value={replaceText}
                            onChange={
                                handleChange
                            }
                            data-test-id="image-modal-alt-text-input"
                        />
                        <div className="d-flex border-bottom border-end border-top border-1 border-secondary rounded-top-0 rounded rounded-start-0">
                            <button title="Replace" type="button" className="rounded-0 toolbar-item" onClick={()=>onClickReplaceOnce((x:number) => x + 1)}>
                                <span className="icon replace  m-0"></span>
                            </button>
                            <button title="Replace All" type="button" className="rounded-0  toolbar-item" onClick={() => onClickReplace((x: number) => x + 1)}>
                                <span className="icon replace-all m-0"></span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}