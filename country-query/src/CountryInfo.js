import { isArray } from '@apollo/client/utilities';
import { isObjectType } from 'graphql';
import React, {useState} from 'react';
import ReactDOM from 'react-dom';
const fields = ["capital", "population", "currencies", "subregion", "languages"];


function CountryInfo(props) {
    const [retObj, setRetObj] = useState(<tr>Loading</tr>);
    const idx = props.name.indexOf('[');
    const commonName = (idx == -1 ? props.name: props.name.slice(0,idx).trim());

    const setInfo = (setHook)=>{
        fetch(`https://restcountries.com/v3.1/name/${commonName}`)
      .then(response => response.json())
      .then(data => {
        const res = data.filter(x=>(x.name.common.toLowerCase() == commonName.toLowerCase()));
        var countryObj;
        if(res.length == 0){countryObj = data[0];}
        else{countryObj = res[0];}

        setHook(
        <tr>
            <td>{props.name}</td>
            <td>{countryObj.name.official}</td>
            {
            fields.map(
                (field)=>{
                    if(!(field in countryObj))return <td>--</td>;
                    const fieldVal = countryObj[field];
                    if(isArray(fieldVal)){
                        return  <td>{fieldVal.join()}</td>
                    }
                    else if(typeof fieldVal === 'string' || typeof fieldVal === 'number'){
                        return <td>{fieldVal}</td>
                    }
                    else{
                        if(field == "currencies")
                        return <td>{Object.keys(fieldVal).join(', ')}</td>
                        else
                        return <td>{Object.values(fieldVal).join(', ')}</td>
                        // return <td>{Object.values(fieldVal).join()}</td>
                    }
                })
                
            }
        </tr>
      );
    
    }
      
      ).catch(error => setRetObj(<tr><td>{props.name}</td> <td>No information found!</td></tr>));
    }

    setInfo(setRetObj);
    return retObj;
  }
  
  export default CountryInfo;