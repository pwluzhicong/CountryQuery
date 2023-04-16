import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import {ApolloClient, InMemoryCache, gql, useQuery} from '@apollo/client';
import CountryInfo from './CountryInfo';
// initialize a GraphQL client
const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: 'https://countries.trevorblades.com'
  });
  

// const LIST_COUNTRIES = gql`
// {
//   countries(filter: { continent: { eq: "NA" } }){code, name}
// }
// `;

const fields = ["Name", "OfficialName", "Capital", "Population", "Currencies", "Subregion", "Languages"];

function ListCountries(props) {
    // const [continent, setContinent] = useState(props.continent);
    const [countryCount, setCountryCount] = useState(2);
    const [countryList, setCountryList] = useState([]);


    // const [showResults, setShowResults] = React.useState(false);
    
    const [continentNow, setContinentNow] = useState(props.continent);
    const showResults = (continentNow == props.continent);

    // const continent = props.continent;
    // const continent = ()=>{
    //   setShowResults(false);
    //   return props.continent;
    // }
    const continent = props.continent;
    // setContinent(props.continent);
    // const [continent, setContinent] = useState(props.continent);

    // const {data3, loading3, error3} = useQuery(LIST_CONTINENTS2, {client});
  
    const LIST_COUNTRIES = gql`
    {
      countries(filter: { continent: { eq: "${props.continent}" } }){code, name}
    }
    `;
    const {data, loading, error} = useQuery(LIST_COUNTRIES, {client});

    if (loading || error) {
      // setShowResults(false);
      return <p>{error ? error.message : 'Fetching Countries...'}</p>;
    }

    const handleInputChange = (e) => {
        const value = e.target.value;
        var parseVal = parseInt(value);
        if(parseVal > 10)parseVal = 10;
        if(parseVal < 2) parseVal = 2;
        if(isNaN(parseVal))parseVal = 2;
        setCountryCount(parseVal);
      };

    const chooseCountries = (count) => {
        const copyCountries = [...data.countries];

        var z = (copyCountries.sort(()=>Math.random() - 0.5).slice(0, count)).sort((a,b)=>a.name>b.name?1:-1);
    
        return z;
    }

    return (
        <div>
        <div>
            Total Number Of Countries of {continent}: {data.countries.length}
        </div>
        <div>
        Select Number: <input 
            type="number"
            id="country-count-input"
            value={countryCount}
            onChange={handleInputChange}
            min={2}
            max={10}
        >
        </input> 
        <button onClick={()=>{
          setCountryList(chooseCountries(countryCount));
          // setShowResults(true);
          setContinentNow(props.continent);
          // setContinent(props.continent);
        }}>Select Countries</button>
        </div>
        {showResults?<table>
                <tr>
                {
                    fields.map((x)=><th>{x}</th>)
                }
                </tr>
                {countryList.map((x)=><CountryInfo name={x.name}></CountryInfo>)}
            
            </table>:<div></div>
        } 

            {/* {props.continent} {data.countries.length} */}

        </div>
    );
  }
  
  export default ListCountries;