import React from 'react'

const Form = props => {
    // Forming the data

    return (
        <div className="pet-from">
            <h1>Add A Pet!</h1>
            <form>
                <div>
                    <label>Name:</label>
                    <input name="name" />
                </div>
                <div>
                    <label>Type of Animal</label>
                    <input name="typeOfAnimal" />
                </div>
                <div>
                    <label>Breed</label>
                    <input name="breed" />
                </div>
                <div>
                    <label>Age</label>
                    <input name="age" />
                </div>
                <div>
                    <label>Sex</label>
                    <input name="sex" />
                </div>

                <input type="submit" />
            </form>
        </div>
    )
}

export default Form