export interface IProject {
    id:            number;
    title:         string;
    description:   string;
    start_date:    Date;
    delivery_date: Date;
    status:        string;
    user_id:       number;
    created_at:    Date;
}

export interface ICreateProjectRequest {
    title:         string;
    description:   string;
    start_date:    Date;
    delivery_date: Date;
    status:        string;
}