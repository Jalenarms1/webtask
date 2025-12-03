using System;
using WebTask.Contracts.Enums.Tasks;

namespace WebTask.Contracts.Dtos.Tasks;

public sealed record CreateTaskDto
{
    public WebTaskStatus Status { get; set;} = WebTaskStatus.Unclaimed;
    public int CategoryId {get;set;}
    public string Title {get;set;} = string.Empty;
    public string Description {get;set;} = string.Empty;

    public int CreatedByUserId {get;set;}

    public int? AssignedToUserId {get;set;}

    public DateTime? DueDate {get;set;}
}
