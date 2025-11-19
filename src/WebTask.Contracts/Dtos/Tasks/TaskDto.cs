using WebTask.Contracts.Enums.Tasks;
namespace WebTask.Contracts.Dtos.Tasks;

public struct TaskDto
{
    public WebTask.Contracts.Enums.Tasks.TaskStatus Status { get; set; }
    public int CategoryId {get;set;}
    public string Title {get;set;}
    public string Description {get;set;}

    public int CreatedByUserId {get;set;}

    public int? AssignedToUserId {get;set;}
}
