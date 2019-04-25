
CREATE PROCEDURE BuildingUser_GetById(
	@Id int
)
AS
BEGIN
		SELECT 
		[Id],
		[UsersId],
		[BuildingId],
		[SinceWhen],
		[AssignedTo]
	FROM [dbo].[BuildingUser]
	WHERE Id = @Id
END