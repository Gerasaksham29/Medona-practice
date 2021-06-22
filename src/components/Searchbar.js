import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
//import './Searchbar.css';




const Searchbar = () => {

  const [myOptions, setMyOptions] = useState([])

  const getDataFromAPI = () => {
    console.log("Options Fetched from API")

    fetch('').then((response) => {
      return response.json()
    }).then((res) => {
      console.log(res.data)
      for (var i = 0; i < res.data.length; i++) {
        myOptions.push(res.data[i].employee_name)
      }
      setMyOptions(myOptions)
    })
  }

  return (
    <div className="search" style={{
    }}>
      <div>
        <h3 style={{
          width: 500, position: 'relative', left: '37%', top: '40%', padding: '30px',
          transform: 'translate(10%, 10%)'
        }} id="head">FIND  A  MEDICINE!</h3></div>
      <Autocomplete
        style={{
          width: 500, position: 'relative', left: '50%', top: '50%',
          transform: 'translate(-50%, -50%)'
        }}
        freeSolo
        autoComplete
        autoHighlight
        options={myOptions}
        renderInput={(params) => (
          <TextField {...params}
            onChange={getDataFromAPI}
            variant="outlined"
            label="Search Box"

          />

        )}
      />

    </div>

  )



}


export default Searchbar;