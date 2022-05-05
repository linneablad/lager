import { render } from '@testing-library/react-native';
import PickList from '../components/pick/PickList';

const route = {
    params: {
        order: {
            name: "Anders Andersson",
            address: "Andersgatan 2",
            zip: 12345,
            city: "Anderstorp",
            order_items: [
                {name: "Hundbädd", amount: 2, location: "A1B4", stock: 100},
                {name: "Hundhalsband", amount: 5, location: "A1B6", stock: 0},
            ]
        }
    }
};

const setProducts = () => false;

test('View should contain name, address, zip and city of the order', async () => {
    const { getByText, debug } = render(<PickList route={route} setProducts={setProducts} />);

    const name = await getByText('Anders Andersson');
    const address = await getByText('Andersgatan 2');
    const zipCity = await getByText('12345 Anderstorp');

    expect(name).toBeDefined();
    expect(address).toBeDefined();
    expect(zipCity).toBeDefined();
    //debug()
});

test('View should contain a list of products of the order', async () => {
    const { getByText, debug } = render(<PickList route={route} setProducts={setProducts} />);

    const product1 = await getByText('Hundbädd - 2 - A1B4');
    const product2 = await getByText('Hundhalsband - 5 - A1B6');

    expect(product1).toBeDefined();
    expect(product2).toBeDefined();
    //debug()
});

test('View should contain the text Ordern går inte att packa då varor saknas when there is not enough products in stock', async () => {
    const { getByText, debug } = render(<PickList route={route} setProducts={setProducts} />);

    const text = await getByText('Ordern går inte att packa då varor saknas');

    expect(text).toBeDefined();
    //debug()
});
