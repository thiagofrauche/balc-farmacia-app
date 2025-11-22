// Carrega o dataset local do curso
import dataset from '@/data/course_dataset.json';

export type Course = typeof dataset.course;

export function getCourse() {
  return dataset.course;
}
