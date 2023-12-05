import {IProjectInfo, ProjectDataType} from "../../designer/DesignerType";

export interface OperateResult<T = any> {
    status?: boolean;
    msg?: string;
    data?: T;
}

export abstract class AbstractOperator {

    public abstract getKey(): string;

    public abstract createProject(project: IProjectInfo): Promise<string>;

    public abstract saveProject(projectData: ProjectDataType): Promise<OperateResult> ;

    public abstract deleteProject(id: string): Promise<boolean>;

    public abstract getProjectList(): Promise<any[]>;

    public abstract getProject(id: string): Promise<OperateResult<ProjectDataType>>;

    public abstract copyProject(id: string, name?: string): Promise<OperateResult<string>>;
}