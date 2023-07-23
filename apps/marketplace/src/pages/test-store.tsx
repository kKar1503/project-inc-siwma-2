import useProductStore from '@/stores/products';
import { ListingItem } from '@inc/db';
import { useState } from 'react';

const ListingTable = () => {
  const product = useProductStore();
  const [name, setName] = useState('');
  const [chineseName, setChineseName] = useState<string | null>(null);
  const [description, setDescription] = useState('');
  const [unit, setUnit] = useState('');
  const [chineseUnit, setChineseUnit] = useState<string | null>(null);
  const [categoryId, setCategoryId] = useState(0);

  return (
    <>
      <ul>
        {product.products.map((p) => (
          <li>
            <span>{JSON.stringify(p)}</span>
            <button onClick={() => product.removeProductById(p.id)}>removeProductById</button>
            <button onClick={() => product.removeProductsById([p.id, p.id + 1, p.id + 2])}>
              removeProductsById
            </button>
            <button onClick={() => product.removeProduct(p)}>removeProduct</button>
          </li>
        ))}
      </ul>
      <br />
      <span>Name: </span>
      <input onChange={(e) => setName(e.target.value)} />
      <br />
      <span>Chinese Name</span>
      <input onChange={(e) => setChineseName(e.target.value)} />
      <br />
      <span>description</span>
      <input onChange={(e) => setDescription(e.target.value)} />
      <br />
      <span>unit</span>
      <input onChange={(e) => setUnit(e.target.value)} />
      <br />
      <span>chineseUnit</span>
      <input onChange={(e) => setChineseUnit(e.target.value)} />
      <br />
      <span>categoryId</span>
      <input onChange={(e) => setCategoryId(parseInt(e.target.value, 10))} />
      <br />
      <button
        onClick={() => {
          product.addProducts([
            {
              id: product.products.length + 1,
              name,
              chineseName,
              description,
              unit,
              createdAt: new Date(),
              updatedAt: new Date(),
              chineseUnit,

              categoryId,
            },
            {
              id: product.products.length + 2,
              name,
              chineseName,
              description,
              unit,
              createdAt: new Date(),
              updatedAt: new Date(),
              chineseUnit,

              categoryId,
            },
          ]);
        }}
      >
        Submit 2
      </button>
      <button
        onClick={() => {
          product.addProduct({
            id: product.products.length + 1,
            name,
            chineseName,
            description,
            unit,
            createdAt: new Date(),
            updatedAt: new Date(),
            chineseUnit,

            categoryId,
          });
        }}
      >
        Submit
      </button>
      <button onClick={() => product.resetProducts()}>Reset</button>
    </>
  );
};

export default ListingTable;
