using WebTask.Contracts.Enums.Tasks;
namespace WebTask.Contracts.Dtos.Tasks;

public sealed record TaskDto
{
    public int UserTaskId {get;set;}
    public WebTaskStatus Status { get; set; }
    public int CategoryId {get;set;}
    public string Title {get;set;} = string.Empty;
    public string Description {get;set;} = string.Empty;
    public int CreatedByUserId {get;set;}
    public int? AssignedToUserId {get;set;}
    public int? ProjectId {get;set;}
    public DateTime CreatedDate {get;set;}
    public DateTime? DueDate {get;set;}
}
