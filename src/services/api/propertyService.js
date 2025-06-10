import propertyData from '../mockData/properties.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class PropertyService {
  constructor() {
    this.properties = [...propertyData];
  }

  async getAll() {
    await delay(300);
    return [...this.properties];
  }

  async getById(id) {
    await delay(200);
    const property = this.properties.find(p => p.id === id);
    return property ? { ...property } : null;
  }

  async create(propertyData) {
    await delay(400);
    const newProperty = {
      ...propertyData,
      id: Date.now().toString(),
      listingDate: new Date().toISOString(),
      isFavorite: false
    };
    this.properties.push(newProperty);
    return { ...newProperty };
  }

  async update(id, updates) {
    await delay(300);
    const index = this.properties.findIndex(p => p.id === id);
    if (index === -1) {
      throw new Error('Property not found');
    }
    
    this.properties[index] = { ...this.properties[index], ...updates };
    return { ...this.properties[index] };
  }

  async delete(id) {
    await delay(300);
    const index = this.properties.findIndex(p => p.id === id);
    if (index === -1) {
      throw new Error('Property not found');
    }
    
    const deletedProperty = this.properties.splice(index, 1)[0];
    return { ...deletedProperty };
  }

  async search(query) {
    await delay(250);
    const searchTerm = query.toLowerCase();
    const filtered = this.properties.filter(property =>
      property.title.toLowerCase().includes(searchTerm) ||
      property.address.toLowerCase().includes(searchTerm) ||
      property.city.toLowerCase().includes(searchTerm) ||
      property.state.toLowerCase().includes(searchTerm) ||
      property.propertyType.toLowerCase().includes(searchTerm)
    );
    return [...filtered];
  }

  async getFavorites() {
    await delay(200);
    const favorites = this.properties.filter(p => p.isFavorite);
    return [...favorites];
  }
}

export default new PropertyService();