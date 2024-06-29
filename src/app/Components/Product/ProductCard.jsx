import { useState } from "react";
import { PiPlusSquareBold, PiMinusSquareBold } from "react-icons/pi";
import { RiFileInfoFill } from "react-icons/ri";


import { camelCaseToNormalText } from "../../utils/index";




const ProductCard = ({imageType, productInformation, allergyAnalysis}) => {

    const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);

    console.log(productInformation.otherDetails);

    const otherDetails = productInformation.otherDetails.split(',');

    

    const productContent = (
        <div className="product-content">
            {
                productInformation.ingredients.length > 0 && (
                    <>
                         <h3>Ingredients Used:</h3> <p>  {productInformation.ingredients.join(', ')}</p>
                    </>
                )
            }

            {
                productInformation.benefits.length > 0 && (
                    <>
                        <h3>Benefits</h3>
                        <ul>
                            {
                                productInformation.benefits.map((item, i) => <li key={i}>{item}</li>)
                            }
                        </ul>
                    </>
                )
            }
            {
                
                productInformation.otherDetails.length > 0 && (

                    <>
                        <h3>Other Details</h3>
                        {
                            <ul>
                                {
                                    otherDetails.map((item, key) => {
                                        return <li key={key}>{item}</li>
                                    })
                                }
                            </ul>
                        }
                        
                    </>
                )
                // Object.keys(productInformation.otherDetails).length > 0 &&
                // <>
                //     <h3>Other Details</h3>
                //     <ul>
                //         {
                //             Object.keys(productInformation.otherDetails).map((key, i) => <li key={i}>{camelCaseToNormalText(key)} : {productInformation.otherDetails[key]}</li>)
                //         }
                //     </ul>
                // </>
            }
        </div>
    )

    return ( 
        <>
            <div className="identifier">
                <span>{imageType}</span>
            </div>
            <div className="product-title">
                <h2 className="heading"> {productInformation.productName} </h2>
                {
                    productInformation.productType && <p className="sub-heading">Product Type: <span>{productInformation.productType}</span></p>
                }
            </div>
            <div className="detection-area">
                {
                    !allergyAnalysis.isProductRecommended 
                    ?
                        allergyAnalysis.allergicSubstances.length > 0 ? (
                            <>
                                <h3>Allergic Substances: </h3>
                                <ul>
                                    {
                                        allergyAnalysis.allergicSubstances.map((item, key) => <li key={key}>{item}</li>)
                                    }
                                </ul>
                            </>
                        ) : <p className="warning-message">No Allergic Content Detected! Although not Recommended</p>
                    : <p className="success-message">No Allergic Content Detected!</p>
                }
                {
                    allergyAnalysis?.productRecommendationSummary && 
                    <p>
                        <RiFileInfoFill />
                        {allergyAnalysis?.productRecommendationSummary}
                    </p>
                }
            </div>
            
            <button className="link" onClick={() => setShowAdditionalInfo(!showAdditionalInfo)}>
               { 
                !showAdditionalInfo 
                    ? (
                        <>
                            <PiPlusSquareBold />
                            Additional Information
                        </>
                    ) : (
                        <>
                            <PiMinusSquareBold />
                            Hide Additional Information
                        </>
                    )
                }
            </button>

            { 
                showAdditionalInfo && productContent 
            }
        </>
     );
}
 
export default ProductCard;