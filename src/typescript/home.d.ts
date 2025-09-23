type IHome = {
    id: number,
    title: string,
    tour: string,
    image: string,
}

type IHotTour = {
    id: number;
    name: string;
    description: string;
    logo: string;
    cost: number;
    start_date: string;  
    end_date: string;   
    type_room: string;
    type: number;        
    can_order: number;   
    categories: Category;
}

type Category = {
    id: number;
    name: string;
    description: string;
    number: number;
}
