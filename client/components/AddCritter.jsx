import React from 'react';

const AddCritter = props => {
  return (
    <form>
      <label htmlFor="name">Name</label>
      <input name="name" />
      <label htmlFor="image">Image Url</label>
      <input name="image" />
      <button onClick={props.createCritter}>Submit</button>
    </form>
  )
}

export default AddCritter;
