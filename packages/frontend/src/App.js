import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  Checkbox,
  IconButton,
  Paper,
  CircularProgress,
  Chip,
  Stack,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Add as AddIcon,
  Save as SaveIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import './App.css';

const API_URL = '/api/todos';

const useTodos = () =>
  useQuery({
    queryKey: ['todos'],
    queryFn: async () => {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Failed to fetch todos');
      }
      return response.json();
    },
  });

function App() {
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editingTitle, setEditingTitle] = useState('');
  const queryClient = useQueryClient();

  const { data: todos = [], isLoading, isError, error } = useTodos();

  const addTodoMutation = useMutation({
    mutationFn: async (title) => {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
      });

      if (!response.ok) {
        throw new Error('Failed to add todo');
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      setNewTodoTitle('');
    },
  });

  const toggleTodoMutation = useMutation({
    mutationFn: async (id) => {
      const response = await fetch(`${API_URL}/${id}/toggle`, {
        method: 'PATCH',
      });

      if (!response.ok) {
        throw new Error('Failed to update todo');
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const deleteTodoMutation = useMutation({
    mutationFn: async (id) => {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete todo');
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const updateTodoMutation = useMutation({
    mutationFn: async ({ id, title }) => {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
      });

      if (!response.ok) {
        throw new Error('Failed to update todo');
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      setEditingTodoId(null);
      setEditingTitle('');
    },
  });

  const handleAddTodo = (e) => {
    e.preventDefault();
    const title = newTodoTitle.trim();
    if (title) {
      addTodoMutation.mutate(title);
    }
  };

  const handleToggleTodo = (id) => {
    toggleTodoMutation.mutate(id);
  };

  const handleDeleteTodo = (id) => {
    deleteTodoMutation.mutate(id);
  };

  const handleEditStart = (todo) => {
    setEditingTodoId(todo.id);
    setEditingTitle(todo.title);
  };

  const handleEditSave = () => {
    if (!editingTodoId) return;

    const title = editingTitle.trim();
    if (!title) return;

    updateTodoMutation.mutate({ id: editingTodoId, title });
  };

  const completedCount = todos.filter((todo) => todo.completed).length;
  const itemsLeft = todos.length - completedCount;

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        py: 4,
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 3,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            mb: 4,
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            TODO App
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9 }}>
            Session 5: Agentic Development
          </Typography>
        </Paper>

        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Box
              component="form"
              onSubmit={handleAddTodo}
              sx={{ display: 'flex', gap: 2 }}
            >
              <TextField
                fullWidth
                value={newTodoTitle}
                onChange={(e) => setNewTodoTitle(e.target.value)}
                placeholder="What needs to be done?"
                variant="outlined"
                size="medium"
              />
              <Button
                type="submit"
                variant="contained"
                startIcon={<AddIcon />}
                sx={{ minWidth: 120 }}
              >
                Add
              </Button>
            </Box>
          </CardContent>
        </Card>

        {isLoading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
          </Box>
        )}

        {isError && (
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography color="error" variant="body1">
                Unable to load todos. Please try again.
              </Typography>
              {error?.message && (
                <Typography variant="caption" color="text.secondary">
                  {error.message}
                </Typography>
              )}
            </CardContent>
          </Card>
        )}

        {!isLoading && !isError && todos.length === 0 && (
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="body1" color="text.secondary">
                No todos yet. Add one above to get started.
              </Typography>
            </CardContent>
          </Card>
        )}

        {!isLoading && !isError && todos.length > 0 && (
          <Card>
            <List sx={{ p: 0 }}>
              {todos.map((todo, index) => (
                <ListItem
                  key={todo.id}
                  sx={{
                    borderBottom: index < todos.length - 1 ? 1 : 0,
                    borderColor: 'divider',
                    '&:hover': {
                      bgcolor: 'action.hover',
                    },
                  }}
                >
                  <Checkbox
                    checked={todo.completed}
                    onChange={() => handleToggleTodo(todo.id)}
                    sx={{ mr: 2 }}
                  />

                  {editingTodoId === todo.id ? (
                    <Box sx={{ display: 'flex', flex: 1, alignItems: 'center', gap: 1 }}>
                      <TextField
                        fullWidth
                        value={editingTitle}
                        onChange={(e) => setEditingTitle(e.target.value)}
                        size="small"
                      />
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        startIcon={<SaveIcon />}
                        onClick={handleEditSave}
                      >
                        Save
                      </Button>
                      <IconButton
                        size="small"
                        color="default"
                        aria-label="Cancel edit"
                        onClick={() => {
                          setEditingTodoId(null);
                          setEditingTitle('');
                        }}
                      >
                        <CloseIcon />
                      </IconButton>
                    </Box>
                  ) : (
                    <>
                      <Typography
                        sx={{
                          flex: 1,
                          textDecoration: todo.completed ? 'line-through' : 'none',
                          color: todo.completed ? 'text.secondary' : 'text.primary',
                        }}
                      >
                        {todo.title}
                      </Typography>
                      <Stack direction="row" spacing={1}>
                        <IconButton
                          size="small"
                          color="primary"
                          aria-label={`Edit todo ${todo.title}`}
                          onClick={() => handleEditStart(todo)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="error"
                          aria-label={`Delete todo ${todo.title}`}
                          onClick={() => handleDeleteTodo(todo.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Stack>
                    </>
                  )}
                </ListItem>
              ))}
            </List>
          </Card>
        )}

        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Chip label={`${itemsLeft} items left`} color="primary" />
          <Chip label={`${completedCount} completed`} color="success" />
        </Box>
      </Container>
    </Box>
  );
}

export default App;
