export {
	addIngredient,
	removeIngredient,
	initIngredients
	// fetchIngredientsFailed
} from './burgerBuilder';

export {
	purchaseBurger,
	// purchaseBurgerStart,
	// purchaseBurgerSuccess,
	// purchaseBurgerFail,
	purchaseInit,
	// fetchOrdersStart,
	// fetchOrdersSuccess,
	// fetchOrdersFail,
	fetchOrders
} from './order';

export {
	auth
} from './auth';

// the only actionCreators needed in this file, are ones that are called from containers or components
// who is calling who? 
// if an actionCreator is only called by another actionCreator, it does not need to be in this file
// further, it may be a security risk if someone could dispatch an actionCreator improperly