import { Possibility } from 'src/general_intefaces/possibility';
import { Categories } from '../categories/categories';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IProduct } from './product.model';
import { json } from 'express';

const axios = require('axios');

@Injectable()
export class ProductService {

  private readonly logger: Logger = new Logger(ProductService.name);

  private predefinedCategories: Possibility[] = [];
  private predefinedSubcategories: Possibility[] = [];

  constructor(
    @InjectModel('Product')
    private readonly productModel: Model<IProduct>,
    private categories: Categories,
  ) { }

  async find_All_Products_Service(): Promise<IProduct[]> {
    this.logger.log('Try to find all products...');
    let found_products = await this.productModel.find().exec();
    console.log('found_products.length: ', found_products.length);
    return found_products;
  }

  async find_One_Product_By_Id_Service(id: string): Promise<IProduct> {
    this.logger.log('Try to find one product by id...');
    return this.productModel.findById(id).exec();
  }

  async get_All_API(url: string): Promise<any[]> {
    this.logger.log('Try to get everything from the API...');
    return new Promise((resolve, reject) => {
      axios
        .get(url)
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          console.log(error);
          reject(error);
        });
    });
  }

  async makeSynchronousRequest(): Promise<any[]> {
    try {
      const url = 'http://affiliate.linkwi.se/feeds/1.2/CD2068/programs-joined/columns-product_id,product_name,description,category,brand_name,tracking_url,image_url,price,full_price,discount,size,colour,extra_images/catinc-0/catex-0/proginc-10777-279,13219-1981,12723-1626,12906-1852,12297-1269,11285-526,11450-612,12321-1361,10632-237,13076-1864,11593-815,11651-849,10959-783,11708-1464,12663-1906/progex-0/feed.json';

      let http_promise = this.get_All_API(url);
      let response_body = await http_promise;

      // console.log(response_body);

      return response_body;
    } catch (error) {
      // Promise rejected
      console.log(error);
    }
  }

  async get_And_Save_All_From_API_Service_New_Logic() {
    const products = await this.makeSynchronousRequest();
    // const fs = require('fs')
    // const jsonString = JSON.stringify(products);
    // fs.writeFile('./productList.json', jsonString, err => {
    //   if (err) {
    //     console.log('Error writing file', err);
    //   } else {
    //     console.log('Successfully wrote file');
    //   }
    // })
    for (const product of products) {
      let newProduct = this.initNewProduct();
      // 1. Find the right gender
      let gender = null;
      gender = this.setPredefinedCategoryProperty(product, this.categories.genders);
      if (gender) {
        newProduct.gender = gender.value;
        this.setPredefinedListByGender(gender.value);
        // 2. Find the right Category and Main Category
        let category = null;
        category = this.setPredefinedCategoryProperty(product, this.predefinedCategories);
        if (category) {
          newProduct.category = category.value;
          newProduct.mainCategory = category.mainCategory;
        }
        // 3. Find the right Subcategory
        let subcategory = null;
        subcategory = this.setPredefinedCategoryProperty(product, this.predefinedSubcategories);
        if (subcategory) {
          newProduct.subcategory = subcategory.value;
          if (!newProduct.category) {
            newProduct.category = subcategory.category;
            newProduct.mainCategory = subcategory.mainCategory;
          }
        }
      }
      // 4. Save only if the product has a known category
      if (newProduct.category) {
        // 5. Set the rest properties
        newProduct = this.setRemainingProperties(product, newProduct);
        const newElement = new this.productModel(newProduct);
        newElement.save();
      }
    }
  }

  setRemainingProperties(product: any, newProduct: IProduct): IProduct {
    if (product.size !== undefined) {
      product.size.split(',').forEach(size => newProduct.size.push(size));
    }
    if (product.price !== undefined) {
      newProduct.price = Number(product.price.replace(',', '.'));
    }
    if (product.product_id !== undefined) {
      newProduct.product_id = product.product_id.replace('&quot;', '');
    }
    if (product.product_name !== undefined) {
      newProduct.product_name = product.product_name
        .replace('0', '')
        .replace('1', '')
        .replace('2', '')
        .replace('3', '')
        .replace('4', '')
        .replace('5', '')
        .replace('6', '')
        .replace('7', '')
        .replace('8', '')
        .replace('9', '');
      const words = newProduct.product_name.split(' ');
      if (words.length > 1) {
        words.forEach(word => {
          const stringLenghth = words[words.length - 2].length;

          if (stringLenghth > 1 && words[words.length - 2].charAt(stringLenghth - 1) === '-') {
            newProduct.colour = words[words.length - 1];
          }
        });
      }
    }
    if (product.description !== undefined) {
      newProduct.description = product.description;
    }
    if (product.brand_name !== undefined) {
      newProduct.brand_name = product.brand_name
        .replace('&amp;', '&');
    }
    if (product.tracking_url !== undefined) {
      newProduct.tracking_url = product.tracking_url;
    }
    if (product.image_url !== undefined) {
      newProduct.images.push(product.image_url);
    }
    if (product.in_stock !== undefined) {
      newProduct.in_stock = product.in_stock;
    }
    if (product.availability !== undefined) {
      newProduct.availability = product.availability;
    }
    if (product.full_price !== undefined) {
      newProduct.full_price = Number(product.full_price.replace(',', '.'));
    }

    if (product.colour !== undefined) {
      newProduct.colour = product.colour;
    }
    if (product.extra_images !== undefined) {
      product.extra_images.forEach(extraImage => {
        newProduct.images.push(extraImage.extra_image_url);
      });
    }
    if (product.discount !== undefined) {
      newProduct.discount = Math.ceil(Number(product.discount.replace(',', '.')));
    }
    return newProduct;
  }

  setPredefinedListByGender(gender: string) {
    this.predefinedCategories.length = 0;
    this.predefinedSubcategories.length = 0;
    this.predefinedCategories = [];
    this.predefinedSubcategories = [];
    if (gender === this.categories.GENDER_FEMALE) {
      this.categories.femaleCategories.forEach(category => this.predefinedCategories.push(category));
      this.categories.femaleSubcatgories.forEach(subCategory => this.predefinedSubcategories.push(subCategory));
    } else if (gender === this.categories.GENDER_MALE) {
      this.categories.maleCategories.forEach(category => this.predefinedCategories.push(category));
      this.categories.maleSubcategories.forEach(subCategory => this.predefinedSubcategories.push(subCategory));
    } else if (gender === this.categories.GENDER_CHILD) {
      this.categories.childCategories.forEach(category => this.predefinedCategories.push(category));
      this.categories.childSubcategories.forEach(subCategory => this.predefinedSubcategories.push(subCategory));
    } else {
      this.predefinedCategories.splice(0, this.predefinedCategories.length);
      this.predefinedSubcategories.splice(0, this.predefinedSubcategories.length);
    }
  }

  setPredefinedCategoryProperty(productFromApi: any, preDefindedCategoryList: Possibility[]): Possibility {
    // 1.Check Category Property
    let preDefindedCategory = null;
    if (productFromApi.category !== undefined) {
      preDefindedCategory = this.searchAndMatch(productFromApi.category, preDefindedCategoryList);
    }
    // 2.Check Description Property
    if (preDefindedCategory === null && productFromApi.description !== undefined) {
      preDefindedCategory = this.searchAndMatch(productFromApi.description, preDefindedCategoryList);
    }
    // 3. Check Product Name Property
    if (preDefindedCategory === null && productFromApi.product_name !== undefined) {
      preDefindedCategory = this.searchAndMatch(productFromApi.product_name, preDefindedCategoryList);
    }
    // 3. Check Product Name Property
    if (preDefindedCategory === null && productFromApi.brand_name !== undefined) {
      preDefindedCategory = this.searchAndMatch(productFromApi.brand_name, preDefindedCategoryList);
    }
    return preDefindedCategory;
  }

  searchAndMatch(productFromApiProperty: string, preDefindedCategoryList: Possibility[]): Possibility {
    let formatedDescription = null;
    formatedDescription = this.formatString(productFromApiProperty);
    let match = null;
    preDefindedCategoryList.forEach(category => {
      category.possibleNames.forEach(possibleName => {
        if (formatedDescription.includes(possibleName)) {
          match = category;
        }
      });
    });
    return match;
  }

  initNewProduct(): IProduct {
    return {
      product_id: null,
      product_name: null,
      description: null,
      category: null,
      mainCategory: null,
      gender: null,
      subcategory: null,
      brand_name: null,
      tracking_url: null,
      in_stock: null,
      availability: null,
      price: null,
      full_price: null,
      discount: null,
      images: [],
      size: [],
      colour: null,
    } as IProduct;
  }

  formatString(word: string): string {
    return word.replace('-&gt', '')
      .replace(/ /g, '')
      .replace('&gt', '')
      .replace('&amp', '')
      .replace(/\s/g, '')
      .replace(/ά/g, 'α')
      .replace(/ό/g, 'ο')
      .replace(/ώ/g, 'ω')
      .replace(/έ/g, 'ε')
      .replace(/ί/g, 'ι')
      .replace(/ή/g, 'η')
      .replace(/ύ/g, 'υ')
      .toLowerCase();
  }

  async remove_A_Product(id: string): Promise<IProduct> {
    this.logger.log('Try to remove a product...');
    const objectToBeDeleted = await this.productModel.findById(id).exec();
    return await objectToBeDeleted.remove();
  }

  async get_Specific_Products_Service(categoryPath: any, queryParams: any): Promise<any> {
    console.log('New try to find specific products...');

    // categoryPath
    const arrOfThingsToSearch = [{ mainCategory: categoryPath.category }, { gender: categoryPath.gender }, { category: categoryPath.subcategory }];

    const searchQuery: any = { $and: arrOfThingsToSearch };
    if (queryParams.brand_name && queryParams.brand_name.length > 0) {
      searchQuery.brand_name = { $in: queryParams.brand_name };
    }
    if (queryParams.size && queryParams.size.length > 0) {
      searchQuery.size = { $in: queryParams.size };
    }
    if (queryParams.colour && queryParams.colour.length > 0) {
      searchQuery.colour = { $in: queryParams.colour };
    }

    console.log(searchQuery);
    const foundProducts = await this.productModel
      .find(searchQuery)
      .limit(20)
      .skip(20 * + queryParams.page);
    const totalProducts: IProduct[] = await this.productModel.find({ $and: arrOfThingsToSearch });
    const total = await this.productModel.find(searchQuery).countDocuments();
    const colours: string[] = [];
    const brands: string[] = [];
    totalProducts.forEach(product => { colours.push(product.colour), brands.push(product.brand_name); });
    return { products: foundProducts, total, colours: [...new Set(colours)], brands: [...new Set(brands)] };
  }

  async getProductsFromSearchBar(searchTerm: string): Promise<any> {
    const foundProducts = await this.productModel.find({ $text: { $search: searchTerm } });
    return foundProducts;
  }

}
