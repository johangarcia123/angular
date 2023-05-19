import { Component, OnInit } from '@angular/core';
import {HttpClient as HttpClient} from '@angular/common/http';
import { ProductHttpServiceService } from 'src/app/services/product-http-services.service';
import { ProductModel } from 'src/app/entities/product.model';
import { UpdateProductModel } from '../../entities/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  httpClient: any;
  products: ProductModel [] = [];
  selectedProduct: UpdateProductModel = {title: '', price: 0, description:''};
  constructor(private productHttpService: ProductHttpServiceService) {
  }
  privateProductId=0

  dataBody={
    title: '',
    price:0,
    description:''
  }
  initProduct(){
    this.selectedProduct = {title: '', price: 0, description:''};
  }

  ngOnInit(): void {
    this.getProducts();
    //this.getProduct();
    //this.createProduct();
    //this.updateProduct();
    //this.deleteProduct();
  }

  getProducts() {
    this.productHttpService.getAll().subscribe
      (response => {
        this.products = response;
        //console.log(response)
      });
  }

  getProduct() {
    const url = 'http://api.escuelajs.co/api/v1/products/20';
    this.productHttpService.getOne(2).subscribe
      (response => {
        console.log(response)
      });
  }

  createProduct() {
    const data = {
      title: "Zapatos",
      price: 25,
      description: "Deportivos / Alessandro Cisneros",
      images: ['https://m.media-amazon.com/images/I/41lL4RYD-PL._SL500_.jpg'],
      categoryId: 1,
    }
    const url = 'http://api.escuelajs.co/api/v1/products';
    this.productHttpService.store(data).subscribe
      (response => {
        console.log(response)
      });
  }
  //id:ProductModel['id']
  updateProduct() {
    const data = {
      // title: "Camisetas",
      // price: 15,
      // description: "Deportivos / Alessandro Cisneros",
      // images: ['https://m.media-amazon.com/images/I/41lL4RYD-PL._SL500_.jpg'],
      // categoryId: 1
      ...this.selectedProduct,
      ...this.dataBody
    }
    console.log(data)
    //const url = 'http://api.escuelajs.co/api/v1/products/226';
    this.productHttpService.update(this.privateProductId, data).subscribe(response => {
      console.log('hola')
    });
  }

  deleteProduct(id:ProductModel['id']) {
    this.productHttpService.destroy(id).subscribe(
      response => {
        this.products = this.products.filter(product => product.id !== id);
      }
    );
  }

  editProduct(product:ProductModel){
    this.selectedProduct = product;
    this.privateProductId=product.id
  }
}
