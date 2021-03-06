import React,{useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import './add.css';
import { addCoin } from '../../../../features/actions';
import { connect } from 'react-redux';
import Notification from '../../../Alerts/notification';




const Add = (props) => {

    let [result, setResult] = useState(<></>)

   
    const { handleSubmit, register, errors, reset } = useForm();
    const onSubmit = (values, e) => (props.addCoin(values, props.state.newReducer.token)
    .then(res=> res === true? setResult(<Notification notification='success' text="successfully added"/>) : setResult(<Notification notification='error' text="problem while adding"/>)), e.target.reset());
    


    return (
        <div>
        <form className="container-form" onSubmit={handleSubmit(onSubmit)} >
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
                    <textarea id="text" name="text" ref={register({ required: "Required", pattern: { value:/^[\s\S]{100,}$/, message: "invalid text" } })} />
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
                    <label htmlFor="frontphoto">Link to obverse image</label>
                    <input id="frontphoto" name="frontphoto" type="text" ref={register({ required: "Required", pattern: { value: /\bhttps\b/, message: "invalid link" } })} />
                    {errors.frontphoto && <div className="error-form">{errors.frontphoto.message}</div>}
                </div>
                <div id="reverse" className="input">
                    <label htmlFor="backphoto">Link to reverse image</label>
                    <input id="backphoto" name="backphoto" type="text" ref={register({ required: "Required", pattern: { value:/\bhttps\b/, message: "invalid link" } })} />
                    {errors.backphoto && <div className="error-form">{errors.backphoto.message}</div>}
                </div>

                <div >
                    <select className="type-coin" name="typeID" ref={register({ required: "Required", pattern: { value: '', message: "invalid type" } })}>
                        <option value="1">Bullion</option>
                        <option value="2">Exclusive</option>
                        <option value="3">Commemorative</option>
                    </select>
                    {errors.type && <div className="error-form">{errors.type.message}</div>}
                </div>

                <div className="action-buttons">
                    <button >Add</button>
                    <button onClick={() => props.handleMenu('add')} id="cancel">Cancel</button>
                </div>





            </div>
      {result}
            
        </form>
     
</div>
    );
};






let mapStateToProps = (state) => {
    return {
        state
    };
}


export default connect(mapStateToProps, { addCoin })(Add)




