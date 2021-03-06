import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import './edit.css';
import { updateCoin,checkToken } from '../../../../features/actions';
import { connect } from 'react-redux';
import Notification from '../../../Alerts/notification';

let handleLocalStorage = (id,values) => {
    let coins = JSON.parse(localStorage.getItem('coins')) || [];
    let updated = [];
    updated = coins.map(e => e.id == id? {...e,name: values.name,price : values.price,frontphoto: values.frontphoto}:e);
    localStorage.setItem('coins', JSON.stringify(updated));
    let history = JSON.parse(localStorage.getItem('history')) || [];
    let historyUpdate = [];
    historyUpdate = history.map(e => e.id == id?{...e,name: values.name,price : values.price,frontphoto: values.frontphoto}:e);
    localStorage.setItem('history', JSON.stringify(historyUpdate));
}


const Edit = (props) => {

    let [array, setArray] = useState([])
    let [element, setElement] = useState({ frontphoto: '', backphoto: '' })
    let [id, setID] = useState(0)
    let [result, setResult] = useState(<></>)
   
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
    const onSubmit = (values, e) => (props.updateCoin(id, values, props.state.newReducer.token)
        .then(res=> res === true? setResult(<Notification notification='success' text="successfully updated"/>)
         : setResult(<Notification notification='error' text="problem while updating"/> )),setTimeout(()=>props.history.goBack(),2000),handleLocalStorage(id,values));


    return (
        <form className="edit-form-container" onSubmit={handleSubmit(onSubmit)} >
            <div className="form-section-one">
                <div className="input">
                    <label htmlFor="name">Name</label>
                    <input id="name" maxLength="45" name="name" ref={register({ required: "Required", pattern: { value: /[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/, message: "invalid name" } })} />
                    {errors.name && <div className="error-form">{errors.name.message}</div>}
                </div>
                <div className="input">
                    <label htmlFor="country">Country</label>
                    <input id="country" maxLength="45" name="issuingcountry" ref={register({ required: "Required", pattern: { value: /^[a-zA-Z\s]*$/, message: "invalid country" } })} />
                    {errors.issuingcountry && <div className="error-form">{errors.issuingcountry.message}</div>}
                </div>
                <div className="input">
                    <label htmlFor="composition">Composition</label>
                    <input id="composition" maxLength="45" name="composition" ref={register({ required: "Required", pattern: { value: /^[A-Za-z]+$/, message: "invalid composition" } })} />
                    {errors.composition && <div className="error-form">{errors.composition.message}</div>}
                </div>
                <div className="input">
                    <label htmlFor="denomination">Denomination</label>
                    <input id="denomination" maxLength="45" name="denomination" ref={register({ required: "Required", pattern: { value: /[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/, message: "invalid denomination" } })} />
                    {errors.denomination && <div className="error-form">{errors.denomination.message}</div>}
                </div>
                <div className="input">
                    <label htmlFor="year">Year</label>
                    <input id="year" maxLength="4" name="year" ref={register({ required: "Required", pattern: { value: /^[0-9]+$/i, message: "invalid year" } })} />
                    {errors.year && <div className="error-form">{errors.year.message}</div>}
                </div>
                <div className="input">
                    <label htmlFor="price">Price</label>
                    <input id="price" name="price" ref={register({ required: "Required", pattern: { value: /^[0-9]+$/i, message: "invalid price" } })} />
                    {errors.price && <div className="error-form">{errors.price.message}</div>}
                </div>

            </div>


            <div className="form-section-two">
                <div id="textarea" className="input">
                    <label htmlFor="text">Text</label>
                    <textarea id="text" name="text" ref={register({ required: "Required", pattern: {value:/^[\s\S]{100,}$/, message: "invalid text" } })} />
                    {errors.text && <div className="error-form">{errors.text.message}</div>}
                </div>
                <div id="quantityarea" className="input">
                    <label htmlFor="quality">Quality</label>
                    <input id="quality" maxLength="45" name="quality" ref={register({ required: "Required", pattern: { value: /^[A-Za-z]+$/, message: "invalid quality" } })} />
                    {errors.quality && <div className="error-form">{errors.quality.message}</div>}
                </div>
                <div id="weightarea" className="input">
                    <label htmlFor="weight">Weight</label>
                    <input id="weight" name="weight" ref={register({ required: "Required", pattern: { value: /^[+-]?\d+(\.\d+)?$/, message: "invalid weight" } })} />
                    {errors.weight && <div className="error-form">{errors.weight.message}</div>}
                </div>
            </div>

            <div className="form-section-two">
                <div id="obverse" className="input">
                    <label htmlFor="obverse">Link to obverse image</label>
                    <input id="frontphoto" name="frontphoto" type="text" ref={register({ required: "Required", pattern: { value: /\bhttps\b/, message: "invalid link" } })} />
                    {errors.frontphoto && <div className="error-form">{errors.frontphoto.message}</div>}
                </div>
                <div id="reverse" className="input">
                    <label htmlFor="reverse">Link to reverse image</label>
                    <input id="backphoto" name="backphoto" type="text" ref={register({ required: "Required", pattern: { value: /\bhttps\b/, message: "invalid link" } })} />
                    {errors.backphoto && <div className="error-form">{errors.backphoto.message}</div>}
                </div>

                <div className="coin-type">
                    <select className="type-coin" name="typeID" ref={register({ required: "Required", pattern: { value: '', message: "invalid type" } })}>
                        <option value="1">Bullion</option>
                        <option value="2">Exclusive</option>
                        <option value="3">Commemorative</option>
                    </select>
                    {errors.type && <div className="error-form">{errors.type.message}</div>}
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
               {result}
        </form>

    );
};







let mapStateToProps = (state) => {
    return {
        state
    };
}


export default connect(mapStateToProps, { updateCoin,checkToken })(Edit)




