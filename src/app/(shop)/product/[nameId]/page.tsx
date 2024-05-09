import ProductDetail from '@/app/(shop)/product/[nameId]/product-detail'
import { getIdFromNameId } from '@/lib/utils'

type ProductDetailPageProps = {
  params: {
    nameId: string
  }
}

const ProductDetailPage = ({ params }: ProductDetailPageProps) => {
  const { nameId } = params
  const productId = getIdFromNameId(nameId)
  return <ProductDetail productId={productId} />
}

export default ProductDetailPage
