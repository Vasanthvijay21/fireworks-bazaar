import List "mo:core/List";
import Types "./types/products";

module {
  // Old domain types (food categories — copied from .old/src/backend/types/products.mo)
  type OldCategory = {
    #Savory;
    #Sweet;
    #GlutenFree;
    #Organic;
  };

  type OldProduct = {
    id : Nat;
    name : Text;
    description : Text;
    price : Float;
    imageUrl : Text;
    category : OldCategory;
    ingredients : [Text];
    dietaryTags : [Text];
    inStock : Bool;
  };

  type OldActor = {
    products : List.List<OldProduct>;
    _seeded : ();
  };

  type NewActor = {
    products : List.List<Types.Product>;
  };

  // Migrate: drop all old food products — the actor will re-seed with fireworks products
  public func run(_ : OldActor) : NewActor {
    { products = List.empty<Types.Product>() };
  };
};
