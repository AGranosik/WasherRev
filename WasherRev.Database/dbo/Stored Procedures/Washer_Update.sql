CREATE PROCEDURE Washer_Update(
	@Id INT,
	@Name varchar(128),
	@RoomId INT NULL,
	@ProducerId INT,
	@SinceWhen DATETIME,
	@WorkedTo DATETIME,
	@IsActive bit
)
AS
BEGIN
	UPDATE [dbo].[Washer]
	SET 
	[Name] = ISNULL(@Name, Name),
	[RoomId] = ISNULL(@RoomId, RoomId),
	[ProducerId] = ISNULL(@ProducerId, ProducerId),
	-- cannot edit
	[SinceWhen] = [SinceWhen],
	[WorkedTo] = ISNULL(@WorkedTo, WorkedTo),
	[IsActive] = [IsActive]
END