CREATE PROCEDURE BuildingUser_Update (
		@Id INT,
		@UsersId INT,
		@BuildingId INT,
		@SinceWhen DATETIME,
		@AssignedTo DATETIME
)
AS
BEGIN
	UPDATE [dbo].[BuildingUser]
	SET
		UsersId = ISNULL(@UsersId, UsersId),
		BuildingId = ISNULL(@BuildingId, BuildingId),
		SinceWhen = SinceWhen,
		AssignedTo = AssignedTo
	WHERE Id = @Id

END