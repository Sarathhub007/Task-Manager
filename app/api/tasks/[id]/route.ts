import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

async function getUserId(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return null;
  }

  try {
    const payload = verifyToken(token);
    return payload.id;
  } catch {
    return null;
  }
}

// =========================
// UPDATE TASK
// =========================

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const userId = await getUserId(req);

  if (!userId) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const { id } = await params;

    const body = await req.json();

    const {
      title,
      description,
      completed,
      priority,
      category,
      dueDate,
    } = body;

    // =========================
    // Check Ownership
    // =========================

    const task = await prisma.task.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!task) {
      return NextResponse.json(
        { error: "Task not found" },
        { status: 404 }
      );
    }

    // =========================
    // Validate Title
    // =========================

    if (
      title !== undefined &&
      (!title || !title.trim())
    ) {
      return NextResponse.json(
        { error: "Title cannot be empty" },
        { status: 400 }
      );
    }

    // =========================
    // Build Update Data
    // =========================

    const updateData: {
      title?: string;
      description?: string | null;
      completed?: boolean;
      priority?: "LOW" | "MEDIUM" | "HIGH";
      category?: string | null;
      dueDate?: Date | null;
    } = {};

    // Title

    if (title !== undefined) {
      updateData.title = title.trim();
    }

    // Description

    if (description !== undefined) {
      updateData.description =
        description?.trim() || null;
    }

    // Completed

    if (completed !== undefined) {
      updateData.completed = Boolean(completed);
    }

    // Priority

    if (priority !== undefined) {
      if (
        priority !== "LOW" &&
        priority !== "MEDIUM" &&
        priority !== "HIGH"
      ) {
        return NextResponse.json(
          { error: "Invalid priority" },
          { status: 400 }
        );
      }

      updateData.priority = priority;
    }

    // Category

    if (category !== undefined) {
      updateData.category =
        category?.trim() || null;
    }

    // Due Date

    if (dueDate !== undefined) {
      if (!dueDate) {
        updateData.dueDate = null;
      } else {
        const parsedDate = new Date(dueDate);

        if (Number.isNaN(parsedDate.getTime())) {
          return NextResponse.json(
            { error: "Invalid due date" },
            { status: 400 }
          );
        }

        updateData.dueDate = parsedDate;
      }
    }

    // =========================
    // Update Database
    // =========================

    const updatedTask = await prisma.task.update({
      where: {
        id,
      },
      data: updateData,
    });

    return NextResponse.json(updatedTask);
  } catch (error) {
    console.error(
      "Failed to update task:",
      error
    );

    return NextResponse.json(
      { error: "Failed to update task" },
      { status: 500 }
    );
  }
}

// =========================
// DELETE TASK
// =========================

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const userId = await getUserId(req);

  if (!userId) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const { id } = await params;

    // =========================
    // Check Ownership
    // =========================

    const task = await prisma.task.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!task) {
      return NextResponse.json(
        { error: "Task not found" },
        { status: 404 }
      );
    }

    // =========================
    // Delete
    // =========================

    await prisma.task.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.error(
      "Failed to delete task:",
      error
    );

    return NextResponse.json(
      { error: "Failed to delete task" },
      { status: 500 }
    );
  }
}