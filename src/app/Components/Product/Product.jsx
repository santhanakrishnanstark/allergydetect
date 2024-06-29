import ProductCard from "./ProductCard";

const Product = ({product}) => {


    const isProduct = (product.imageType && product?.productInformation?.productName) ? true : false;

    return ( 
        <div className="product">
            {
                isProduct 
                ? <ProductCard 
                    imageType={product.imageType} 
                    productInformation={product.productInformation}
                    allergyAnalysis={product.allergyAnalysis} />
                :
                <>
                    <div className="identifier">
                        <h2>{product.imageType} </h2>
                    </div>
                    <div className="product-content">
                        <p>{product?.imageDescription}</p>
                    </div>
                </>
            }
        </div>
     );
}
 
export default Product;