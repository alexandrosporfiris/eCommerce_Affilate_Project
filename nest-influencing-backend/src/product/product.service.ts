import { Possibility } from 'src/general_intefaces/possibility';
import { Categories } from '../categories/categories';
import { HttpService, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IProduct } from './product.model';
import { log } from 'console';

const axios = require('axios');

@Injectable()
export class ProductService {

  private readonly logger: Logger = new Logger(ProductService.name);

  private predefinedCategories: Possibility[] = [];
  private predefinedSubcategories: Possibility[] = [];

  constructor(
    @InjectModel('Product')
    private readonly productModel: Model<IProduct>,
    private readonly httpService: HttpService,
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
      const url = 'http://affiliate.linkwi.se/feeds/1.2/CD2068/programs-joined/columns-product_id,barcode,model_name,product_name,description,category,brand_name,tracking_url,thumb_url,image_url,in_stock,availability,on_sale,currency,price,full_price,discount,times_bought,size,colour,program_id,program_name,extra_images/catinc-0/catex-0/proginc-10777-279,13219-1981,12723-1626,310-222,12906-1852,12297-1269,11285-526,11450-612,12321-1361,12584-1472,12584-1485,11427-611,10632-237,77-1506,13076-1864,11593-815,11651-849,10959-783,11708-1464,12663-1906/progex-0/feed.json';

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
        await newElement.save();
      }
    }
    await this.updateCategoriesImages().then(() => { this.logger.log('erteksa'), this.getAllProductsAssignImages(); });

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
      newProduct.imagesUrls.push(product.image_url);
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
    if (product.extra_images !== undefined && product.extra_images.length) {
      product.extra_images.forEach(extraImage => {
        if (extraImage.extra_image_url !== undefined && extraImage.extra_image_url !== null) {
          newProduct.imagesUrls.push(extraImage.extra_image_url);
        }
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
    let preDefindedCategory = null;
    // 1. Check Product Name Property
    if (productFromApi.product_name !== undefined) {
      preDefindedCategory = this.searchAndMatch(productFromApi.product_name, preDefindedCategoryList);
    }
    // 2.Check Category Property
    if (preDefindedCategory === null && productFromApi.category !== undefined) {
      preDefindedCategory = this.searchAndMatch(productFromApi.category, preDefindedCategoryList);
    }
    // 2. Check Product Name Property
    if (preDefindedCategory === null && productFromApi.product_name !== undefined) {
      preDefindedCategory = this.searchAndMatch(productFromApi.product_name, preDefindedCategoryList);
    }
    // 3. Check Product Name Property
    if (preDefindedCategory === null && productFromApi.brand_name !== undefined) {
      preDefindedCategory = this.searchAndMatch(productFromApi.brand_name, preDefindedCategoryList);
    }
    // 4.Check Description Property
    if (preDefindedCategory === null && productFromApi.description !== undefined) {
      preDefindedCategory = this.searchAndMatch(productFromApi.description, preDefindedCategoryList);
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
      imagesUrls: [],
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
    console.log(queryParams);

    // categoryPath
    let arrOfThingsToSearch;
    if (queryParams.searchTerm) {
      arrOfThingsToSearch = [{ mainCategory: categoryPath.category }, { gender: categoryPath.gender }, { category: categoryPath.subcategory },
      { $text: { $search: this.formatsearchTerm(queryParams.searchTerm) } }];
    } else {
      arrOfThingsToSearch = [{ mainCategory: categoryPath.category }, { gender: categoryPath.gender }, { category: categoryPath.subcategory }];
    }

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
    const genders: string[] = [];
    const mainCategories: string[] = [];
    const categories: string[] = [];
    const foundProducts = await this.productModel.find({ $text: { $search: this.formatsearchTerm(searchTerm) } });
    foundProducts.forEach(product => { genders.push(product.gender), mainCategories.push(product.mainCategory), categories.push(product.category); });
    // tslint:disable-next-line: max-line-length
    return { productsFound: foundProducts, genders: [...new Set(genders)], mainCategories: [...new Set(mainCategories)], categories: [... new Set(categories)] };
  }

  formatsearchTerm(searchTerm: string): string {
    let formatedsearchTerm = '';
    searchTerm.split(' ')
      .forEach(term => formatedsearchTerm = formatedsearchTerm + '"' + this.formatString(term) + '"');
    return '\'' + formatedsearchTerm + '\'';
  }

  async saveProductImages(imageUrl, imageName): Promise<string> {
    let type: string;
    const fs = require('fs');
    const https = require('https');
    const dir = '../nest-influencing-backend/public';
    await axios({
      method: 'GET',
      url: encodeURI(imageUrl),
      responseType: 'stream',
      timeout: 6000000,
      httpsAgent: new https.Agent({ keepAlive: true }),
    })
      .then((response) => {
        return new Promise((resolve) => {
          response.data
            .pipe(fs.createWriteStream(dir + '/' + imageName + '.' + response.headers['content-type'].split('/')[1]))
            .on('finish', () => {
              type = response.headers['content-type'].split('/')[1];
              resolve();
            });
          response.data.on('uncaughtException', (error) => this.logger.log(error));
          response.data.on('error', (error) => this.logger.log(error));
        });
      })
      .catch((error) => this.logger.log(error));
    return type;
  }

  async updateCategoriesImages() {
    this.logger.log('trexw')
    this.productModel.distinct('category', {}).then(async distictCatgories => {
      distictCatgories.forEach(async distictCatgory => {
        this.productModel.findOne({ category: distictCatgory }).then(async product => {
          const fs = require('fs');
          const https = require('https');
          const dir = '../angular-influencing-frontend/src/assets/images/'
            + product.gender + '/' + product.mainCategory;
          if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
          }
          await axios({
            method: 'GET',
            url: encodeURI(product.imagesUrls[0]),
            responseType: 'stream',
            timeout: 6000000,
            httpsAgent: new https.Agent({ keepAlive: true }),
          })
            .then((response) => {
              return new Promise((resolve) => {
                response.data
                  .pipe(fs.createWriteStream(dir + '/' + product.category + '.' + response.headers['content-type'].split('/')[1]))
                  .on('finish', () => {
                    resolve();
                  });
                response.data.on('uncaughtException', (error) => this.logger.log(error));
                response.data.on('error', (error) => this.logger.log(error));
              });
            })
            .catch((error) => {
              this.logger.log(error);
            });
        });
      });
    });
  }

  async getAllProductsAssignImages() {
    await this.productModel.find({}).then(foundProducts => {
      foundProducts.forEach(async product => {
        if (product.imagesUrls.length) {
          let i = 0;
          product.imagesUrls.forEach(async imageUrl => {
            await this.saveProductImages(imageUrl, product.product_id.replace(/[^a-zA-Z0-9]+/g, '') + i).then(async type => {
              if (type != null && type !== undefined && type !== 'html') {
                product.images.push(product.product_id.replace(/[^a-zA-Z0-9]+/g, '') + i + '.' + type);
                const index = product.imagesUrls.indexOf(imageUrl);
                if (index > -1) {
                  product.imagesUrls.splice(index, 1);
                }
                i = i + 1;
                const filterImagesNonNull = product.images.filter(image => image !== null && image !== undefined);
                const filterimagesUrlsNonNull = product.imagesUrls.filter(imageUrlf => imageUrlf !== null && imageUrlf !== undefined);
                const indexNull = filterimagesUrlsNonNull.indexOf(null);
                if (indexNull > -1) {
                  filterImagesNonNull.splice(indexNull, 1);
                }
                const indexUrlNull = filterimagesUrlsNonNull.indexOf(null);
                if (indexUrlNull > -1) {
                  filterimagesUrlsNonNull.splice(indexNull, 1);
                }
                await this.productModel.updateOne({ product_id: product.product_id },
                  { images: filterImagesNonNull, imagesUrls: filterimagesUrlsNonNull });
              }
            });
          });
        }
      });
    });
  }
}
