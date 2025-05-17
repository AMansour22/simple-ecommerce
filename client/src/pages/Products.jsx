import { ProductCard } from '../components';
import { useProduct } from '../contexts/ProductContext';
import { Loading } from '../components';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

function Products() {
  const { selectedCategory, productsData, loading, setSelectedCategory } = useProduct();
  const { category: urlCategory } = useParams();

  // Sync URL category with context when URL changes
  useEffect(() => {
    if (urlCategory && urlCategory !== selectedCategory) {
      setSelectedCategory(urlCategory);
    }
  }, [urlCategory, selectedCategory, setSelectedCategory]);

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
