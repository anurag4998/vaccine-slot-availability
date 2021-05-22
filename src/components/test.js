import React , {useState} from 'react';
import { useFormik } from 'formik';
import districtmap from '../data/district_map'
import postData from '../apicalls/postdata'
import swal from 'sweetalert';
let districtList = [];
for(let i = 0 ; i < districtmap.length;i ++)
    districtList = [...districtList , districtmap[i]["district name"]]

districtList.sort();
let vaccineList = ['Covaxin', 'Covishield'];
let doseList = ['Dose 1', 'Dose 2'];
let ageGroupList = ['18+', '45+'];

const Test = () => {

  const [moreFilters, setMoreFilters] = useState(false);
  const [isUploading, setisUploading] = useState(false);
  const handleFilterToggle = () => {
        setMoreFilters(!moreFilters)
  } 
  
     
     const formik = useFormik({
        initialValues: {
          district: '',
          vaccine : '',
          email: '',
          dose : '',
          ageGroup : ''
        },

        validate : values => 
        {
            let errors = {}           
            {
              if(!values.email)
                  errors.email = 'Enter your email'
              if(!values.district)
                    errors.district = "Select a district";
              if(!values.vaccine)
                  errors.vaccine = 'Select a vaccine';
            }       
            return errors;
        },

        onSubmit: async(values) => {
          setisUploading(true);
          let district_id = districtmap.find(x => x["district name"] === values.district)["district id"];
          let data = {...values} 
          data.district = district_id
          let a = await postData(data.district,data.vaccine,data.email,data.dose,data.ageGroup);
          if(a === true)
            swal("Done!" , 'registered succesfully' , "success")
          else if(a.response === false)
              swal("Oops!" , a.error , "error")
          setisUploading(false);
        },
      });
    return(
        <div className = 'form-wrapper'>
        <form onSubmit={formik.handleSubmit} className = 'registerform'>
            <div className = 'registerform__row'>
                <input
                    id="email"
                    name="email"
                    type="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    onBlur = {formik.handleBlur}
                    className = "inputbox"
                    placeholder = "Enter Email"
                    required
                />
                {formik.errors.email && formik.touched.email? 
                  <div className = 'registerform__row--error'>{formik.errors.email}</div>
                : null}
            </div>
           
            <div className = 'registerform__row'>
          
                  <select 
                      id="district"
                      name="district"
                      className = "inputbox"
                      onChange={formik.handleChange}
                      required
                      onBlur = {formik.handleBlur}
                      typeof = "search"
                      value={formik.values.district !== '' ?  formik.values.district : undefined}
                  > 
                  <option value = '' hidden>Select District</option>
                 
                  {districtList.map( (x,index) =>
                    <option key={index} value = {x} type = "search">{x}</option>
                  )};
                  
                </select>
                {formik.errors.district && formik.touched.district ? 
                  <div className = 'registerform__row--error'>{formik.errors.district}</div>
                : null}     
            </div>
           
            <div className = 'registerform__row'>
                  <select 
                  id="vaccine"
                  name="vaccine"
                  className = "inputbox"
                  onChange={formik.handleChange}
                  onBlur = {formik.handleBlur}
                  required
                  value={formik.values.vaccine !== '' ? formik.values.vaccine : undefined}
                  >
                  <option value = '' hidden>Select Vaccine</option>
                            
                  {vaccineList.map( (x,index) =>
                    <option key={x} value = {x} type = "search">{x}</option>
                  )};
                </select>
                  
                {formik.errors.vaccine && formik.touched.vaccine ? 
                  <div className = 'registerform__row--error'>{formik.errors.vaccine}</div>
                : null}         
            </div>
            <div className = 'registerform__row row__inline'>
                <div className = 'row__inline--text'>
                    Add More Filters
                </div>
                <div className= "toggle-switch">
                    <button onClick={handleFilterToggle} type="button" className={moreFilters ? "switch on-animationright" : "switch on-animationleft"}></button>
                </div>
            </div>
           
            <div id= "fade" className = {moreFilters ? 'show': 'hide'} >
                  <div className = 'registerform__row'>
                                <select 
                                id="dose"
                                name="dose"
                                className = "inputbox"
                                onChange={formik.handleChange}
                                value={formik.values.dose !== '' ? formik.values.dose : undefined}
                                >
                                <option value = '' hidden>Select Dose</option>
                                          
                                {doseList.map( (x,index) =>
                                  <option key={index} value = {x} type = "search">{x}</option>
                                )};
                              </select>
                  </div>

                  <div className = 'registerform__row'>
                                <select 
                                id="ageGroup"
                                name="ageGroup"
                                className = "inputbox"
                                onChange={formik.handleChange}
                                value={formik.values.ageGroup !== '' ? formik.values.ageGroup : undefined}
                                >
                                <option value = '' hidden>Select Age Group</option>
                                          
                                {ageGroupList.map( (x,index) =>
                                  <option key={index} value = {x} type = "search">{x}</option>
                                )};
                              </select>
                  </div> 
            </div> 
              
            
            <button className = { formik.isValid && formik.dirty === true && !isUploading ?"btn btn--blue submit": "btn btn--disabled submit"   } type="submit"  disabled = {formik.isValid && formik.dirty === true? false : true} >Register</button>
     </form>
    </div>
    )
}

export default Test