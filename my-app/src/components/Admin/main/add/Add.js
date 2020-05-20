import React from "react";
import { useForm } from "react-hook-form";
import './add.css';
import { addCoin } from '../../../../features/actions';
import {connect} from 'react-redux';

const Add = (props) => {
    const { handleSubmit, register, errors,reset } = useForm();
    const onSubmit = (values,e) => (props.addCoin(values,props.state.newReducer.token),e.target.reset());
    

    return (
        <form className="container-form" onSubmit={handleSubmit(onSubmit)} >
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
                    <textarea id="text" name="text" ref={register({ required: "Required", pattern: { value:/[0-9a-zA-Z]{100,}/ ,message: "invalid text" } })} />
                    {errors.text && <div className="error">{errors.text.message}</div>}
                </div>
                <div id="quantityarea" className="input">
                    <label htmlFor="quality">Quality</label>
                    <input id="quality" maxLength="45" name="quality" ref={register({ required: "Required", pattern: { value: /^[A-Za-z]+$/, message: "invalid quality" } })} />
                    {errors.quality && <div className="error">{errors.quality.message}</div>}
                </div>
                <div id="weightarea" className="input">
                    <label htmlFor="weight">Weight</label>
                    <input id="weight" name="weight" ref={register({ required: "Required", pattern: { value: /^[+-]?\d+(\.\d+)?$/, message: "invalid weight" } }) } />
                    {errors.weight && <div className="error">{errors.weight.message}</div>}
                </div>
            </div>

            <div className="form-section-two">
                <div id="obverse" className="input">
                    <label htmlFor="obverse">Link to obverse image</label>
                    <input name="frontphoto" type="text" ref={register({ required: "Required", pattern: { value: '', message: "invalid link" } }) }/>
                    {errors.obverse && <div className="error">{errors.obverse.message}</div>}
                </div>
                <div id="reverse" className="input">
                    <label htmlFor="reverse">Link to reverse image</label>
                    <input name="backphoto" type="text" ref={register({ required: "Required", pattern: { value: '', message: "invalid link" } }) }/>
                    {errors.reverse && <div className="error">{errors.reverse.message}</div>}
                </div>

                <div >
                   <select className="type-coin" name="typeID" ref={register({ required: "Required", pattern: { value: '', message: "invalid type" } }) }>
                       <option value="1">Bullion</option>
                       <option value="2">Exclusive</option>
                       <option value="3">Commemorative</option>
                   </select>
                   {errors.type && <div className="error">{errors.type.message}</div>}
                </div>

             <div className="action-buttons">
               <button >Add</button>
               <button onClick={()=>props.handleMenu('add')} id="cancel">Cancel</button>
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


export default connect(mapStateToProps, { addCoin })(Add)




