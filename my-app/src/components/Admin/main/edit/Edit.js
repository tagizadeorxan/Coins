import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import './edit.css';
import { updateCoin,checkToken } from '../../../../features/actions';
import { connect } from 'react-redux';


let handleLocalStorage = (id,values) => {
    let coins = JSON.parse(localStorage.getItem('coins')) || [];
    let updated = [];
    console.log(coins);
    updated = coins.map(e => e.id == id? {...e,name: values.name,price : values.price}:e);
    console.log(updated)
    localStorage.setItem('coins', JSON.stringify(updated));
    let history = JSON.parse(localStorage.getItem('history')) || [];
    let historyUpdate = [];
    console.log(history);
    historyUpdate = history.map(e => e.id == id?{...e,name: values.name,price : values.price}:e);
    console.log(historyUpdate);
    localStorage.setItem('history', JSON.stringify(historyUpdate));
}


const Edit = (props) => {

    let [array, setArray] = useState([])
    let [element, setElement] = useState({ frontphoto: '', backphoto: '' })
    let [id, setID] = useState(0)
    
   
    useEffect(() => {
        array = props.state.newReducer.coins;
        element = array.find(e => e.id === +props.match.params.id)
        if(element === undefined) {
            window.location.href = '/'
        }
        setID(element.id);
        setArray(array);
        setElement(element);

        //setting default value for each input
        for (let [key, value] of Object.entries(element)) {
            setValue(key, value)
        }


    }, []);


    const { handleSubmit, register, errors, reset, setValue } = useForm();
    const onSubmit = (values, e) => (props.updateCoin(id, values, props.state.newReducer.token),props.history.goBack(),handleLocalStorage(id,values) );


    return (
        <form className="edit-form-container" onSubmit={handleSubmit(onSubmit)} >
            <div className="form-section-one">
                <div className="input">
                    <label htmlFor="name">Name</label>
                    <input id="name" maxLength="45" name="name" ref={register({ required: "Required", pattern: { value: /[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/, message: "invalid name" } })} />
                    {errors.name && <div className="error">{errors.name.message}</div>}
                </div>
                <div className="input">
                    <label htmlFor="country">Country</label>
                    <input id="country" maxLength="45" name="issuingcountry" ref={register({ required: "Required", pattern: { value: /^[a-zA-Z\s]*$/, message: "invalid country" } })} />
                    {errors.issuingcountry && <div className="error">{errors.issuingcountry.message}</div>}
                </div>
                <div className="input">
                    <label htmlFor="composition">Composition</label>
                    <input id="composition" maxLength="45" name="composition" ref={register({ required: "Required", pattern: { value: /^[A-Za-z]+$/, message: "invalid composition" } })} />
                    {errors.composition && <div className="error">{errors.composition.message}</div>}
                </div>
                <div className="input">
                    <label htmlFor="denomination">Denomination</label>
                    <input id="denomination" maxLength="45" name="denomination" ref={register({ required: "Required", pattern: { value: /[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/, message: "invalid denomination" } })} />
                    {errors.denomination && <div className="error">{errors.denomination.message}</div>}
                </div>
                <div className="input">
                    <label htmlFor="year">Year</label>
                    <input id="year" maxLength="4" name="year" ref={register({ required: "Required", pattern: { value: /^[0-9]+$/i, message: "invalid year" } })} />
                    {errors.year && <div className="error">{errors.year.message}</div>}
                </div>
                <div className="input">
                    <label htmlFor="price">Price</label>
                    <input id="price" name="price" ref={register({ required: "Required", pattern: { value: /^[0-9]+$/i, message: "invalid price" } })} />
                    {errors.price && <div className="error">{errors.price.message}</div>}
                </div>

            </div>


            <div className="form-section-two">
                <div id="textarea" className="input">
                    <label htmlFor="text">Text</label>
                    <textarea id="text" name="text" ref={register({ required: "Required", pattern: {value:/^[\s\S]{100,}$/, message: "invalid text" } })} />
                    {errors.text && <div className="error">{errors.text.message}</div>}
                </div>
                <div id="quantityarea" className="input">
                    <label htmlFor="quality">Quality</label>
                    <input id="quality" maxLength="45" name="quality" ref={register({ required: "Required", pattern: { value: /^[A-Za-z]+$/, message: "invalid quality" } })} />
                    {errors.quality && <div className="error">{errors.quality.message}</div>}
                </div>
                <div id="weightarea" className="input">
                    <label htmlFor="weight">Weight</label>
                    <input id="weight" name="weight" ref={register({ required: "Required", pattern: { value: /^[+-]?\d+(\.\d+)?$/, message: "invalid weight" } })} />
                    {errors.weight && <div className="error">{errors.weight.message}</div>}
                </div>
            </div>

            <div className="form-section-two">
                <div id="obverse" className="input">
                    <label htmlFor="obverse">Link to obverse image</label>
                    <input name="frontphoto" type="text" ref={register({ required: "Required", pattern: { value: '', message: "invalid link" } })} />
                    {errors.obverse && <div className="error">{errors.obverse.message}</div>}
                </div>
                <div id="reverse" className="input">
                    <label htmlFor="reverse">Link to reverse image</label>
                    <input name="backphoto" type="text" ref={register({ required: "Required", pattern: { value: '', message: "invalid link" } })} />
                    {errors.reverse && <div className="error">{errors.reverse.message}</div>}
                </div>

                <div className="coin-type">
                    <select className="type-coin" name="typeID" ref={register({ required: "Required", pattern: { value: '', message: "invalid type" } })}>
                        <option value="1">Bullion</option>
                        <option value="2">Exclusive</option>
                        <option value="3">Commemorative</option>
                    </select>
                    {errors.type && <div className="error">{errors.type.message}</div>}
                </div>
                <div>
                    <img className="coin-image" src={element.frontphoto} alt='coin' />
                    <img className="coin-image" src={element.backphoto} alt='coin' />

                    <div className="action-buttons">
                        <button type="submit">Save</button>
                        <button onClick={(e) => (e.preventDefault(), props.history.goBack())} id="cancel">Cancel</button>
                    </div>

                </div>

            </div>

        </form>

    );
};







let mapStateToProps = (state) => {
    return {
        state
    };
}


export default connect(mapStateToProps, { updateCoin,checkToken })(Edit)




