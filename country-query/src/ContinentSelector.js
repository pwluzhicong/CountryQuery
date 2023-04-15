import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import {ApolloClient, InMemoryCache, gql, useQuery} from '@apollo/client';
import ListCountries from './ListCountries';

// initialize a GraphQL client
const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: 'https://countries.trevorblades.com'
  });
  
  // write a GraphQL query that asks for names and codes for all countries

  const LIST_CONTINENTS = gql`
  {
    continents{
        name
        code
    }
  }
  `;


function ContinentSelector(dataList, setParentContinent) {
    const [continent, setContinent] = useState('NA');

    const {data, loading, error} = useQuery(LIST_CONTINENTS, {client});
    const listCountries = (continent)=>{
        return gql`
        {
            countries(filter: { continent: { eq: ${continent} } }){code, name}
        }
        `
    }
    if (loading || error) {
      return <p>{error ? error.message : 'Fetching Continents...'}</p>;
    }

    return (
        <div>
        Continent: <select value={continent} onChange={event => setContinent(event.target.value)}>
            {data.continents.map(continent => (
            <option key={continent.code} value={continent.code}>
                {continent.code}({continent.name})
            </option>
            ))}
        </select>

        <ListCountries continent={continent}/>
        </div>

    );

    // return (
    // <table>
    //     <tbody>
    //         <tr>
    //             <td>Continent</td>
    //             <td>
    //             <select value={continent} onChange={event => setContinent(event.target.value)}>
    //             {data.continents.map(continent => (
    //             <option key={continent.code} value={continent.code}>
    //                 {continent.code}({continent.name})
    //             </option>
    //             ))}
    //         </select>
    //             </td>
    //         </tr>
    //         <tr>
    //             <td>
    //                 CountryCount
    //             </td>
    //             <td>
    //             <input 
    //                 type="number"
    //                 id="country-count-input"
    //                 value={countryCount}
    //                 onChange={handleInputChange}
    //                 min={2}
    //                 max={10}
    //                 >
    //                 </input>      
    //             </td>
    //         </tr>
    //     </tbody>

    // </table>
    // );
  }
  
  export default ContinentSelector;