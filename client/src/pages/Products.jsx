import { ProductCard } from '../components';
import { useProduct } from '../contexts/ProductContext';
import { Loading } from '../components';

function Products() {
  const { selectedCategory, productsData, loading } = useProduct();

  if (loading) return <Loading />;

  return (
    <main className="mt-14">
      <h1 className="heading-h1 !mb-12 !uppercase">{selectedCategory}</h1>

      {/* Render product cards if data exists */}
      {!!productsData.length && (
        <section className="grid grid-cols-auto-fill-350 gap-x-4 gap-y-8">
          {productsData.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
      )}
    </main>
  );
}

export default Products;
