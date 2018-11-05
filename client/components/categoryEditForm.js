import React from 'react'


const EditCategoryForm = (props) => {
    console.log("props", props)
    const productId = props.id
    
    const inProdArray = props.categoryProduct.inProd
    const notInProdArray = props.categoryProduct.notInProd

    return(
        <div>
        <div>
         {
             inProdArray.map(category => {
                return (
                    <div key={category.id} onClick={props.minusHandleSubmit}>
                    {category.content}
                    </div>
                )
             })
            }
        </div>
        <div>
            {

                notInProdArray.map(category => {
                    return (
                        <div key={category.id} onClick={props.plusHandleSubmit}>
                 {category.content}
                 </div>
                )
            })
        }
        </div>
        </div>
    )
}



export default EditCategoryForm;
